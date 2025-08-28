import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import generate from "@babel/generator";
import { ComponentInfo } from "../@types/componentInfo";

export interface ParsedComponent {
  components: ComponentInfo[];
  imports: string[];
  hooks: string[];
}

export const generateUniqueId = (): string => {
  // Include timestamp for better uniqueness
  return (
    "c_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).substring(2, 8)
  );
};

export const generateSingleComponentJSX = (
  type: string,
  props: Record<string, { type: string; value: any }>
): string => {
  const attributes = Object.entries(props)
    .filter(([key]) => key !== "children")
    .map(([key, propInfo]) => {
      const { type, value } = propInfo;

      // null ve boş değerleri ekleme
      if (value === null || value === "") return "";

      // object tipindeki boş nesneleri atla
      if (
        type === "object" &&
        (value === "" ||
          (typeof value === "object" &&
            value !== null &&
            Object.keys(value).length === 0))
      ) {
        return "";
      }

      // false boolean'ları atla
      if (type === "boolean" && value === false) return "";

      // true boolean'ları yalnızca anahtar olarak ekle
      if (type === "boolean" && value === true) return `${key}`;

      // number her zaman eklenir
      if (type === "number") return `${key}={${value}}`;

      // Diğer her şey
      return `${key}=${JSON.stringify(value)}`;
    })
    .filter(Boolean)
    .join(" ");

  const children = props.children?.value ?? "";

  return `<${type}${attributes ? " " + attributes : ""}>${children}</${type}>`;
};

export const parseReactCode = (code: string): ParsedComponent => {
  try {
    // Clean up duplicate imports before parsing
    const cleanCode = cleanupDuplicateImports(code);

    const ast = parser.parse(cleanCode, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    const components: ComponentInfo[] = [];
    const imports: string[] = [];
    const hooks: string[] = [];

    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === "react") {
          path.node.specifiers.forEach((spec) => {
            if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
              imports.push(spec.imported.name);
            }
          });
        }
      },

      CallExpression(path) {
        if (t.isIdentifier(path.node.callee)) {
          const functionName = path.node.callee.name;
          if (functionName.startsWith("use")) {
            hooks.push(functionName);
          }
        }
      },

      JSXElement(path) {
        const element = path.node;
        if (t.isJSXIdentifier(element.openingElement.name)) {
          const componentName = element.openingElement.name.name;
          const props: Record<string, any> = {};

          // Extract props
          element.openingElement.attributes.forEach((attr) => {
            if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
              const propName = attr.name.name;
              let propValue: any = "";

              if (attr.value) {
                if (t.isStringLiteral(attr.value)) {
                  propValue = attr.value.value;
                } else if (t.isJSXExpressionContainer(attr.value)) {
                  if (t.isStringLiteral(attr.value.expression)) {
                    propValue = attr.value.expression.value;
                  } else if (t.isBooleanLiteral(attr.value.expression)) {
                    propValue = attr.value.expression.value;
                  } else if (t.isNumericLiteral(attr.value.expression)) {
                    propValue = attr.value.expression.value;
                  } else {
                    // For complex expressions, store as string
                    propValue = cleanCode.slice(
                      attr.value.expression.start!,
                      attr.value.expression.end!
                    );
                  }
                }
              } else {
                propValue = true; // Boolean prop without value
              }

              props[propName] = propValue;
            }
          });

          // Add unique ID if not present
          if (!props.id || !props.id.startsWith("c_")) {
            props.id = generateUniqueId();
          }

          // Extract children content - only if it's simple text/expression content
          const childrenContent = extractChildrenContent(element, cleanCode);
          const hasNestedElements =
            element.children &&
            element.children.some(
              (child) => t.isJSXElement(child) || t.isJSXFragment(child)
            );
          const component: ComponentInfo = {
            id: props.id,
            name: componentName,
            type: componentName.toLowerCase(),
            props,
            children: hasNestedElements ? undefined : childrenContent,
            startLine: element.loc?.start.line || 0,
            endLine: element.loc?.end.line || 0,
            startColumn: element.loc?.start.column || 0,
            endColumn: element.loc?.end.column || 0,
          };

          components.push(component);
        }
      },
    });

    return { components, imports, hooks };
  } catch (error) {
    console.error("Error parsing React code:", error);
    return { components: [], imports: [], hooks: [] };
  }
};

const extractChildrenContent = (element: any, code: string): string => {
  if (!element.children || element.children.length === 0) {
    return "";
  }

  // Get the content between opening and closing tags
  const start = element.openingElement.end;
  const end = element.closingElement
    ? element.closingElement.start
    : element.end;

  if (start && end && start < end) {
    return code.slice(start, end).trim();
  }

  return "";
};

export const generateHookVariableName = (
  hookType: string,
  componentId: string
): string => {
  // Use the full componentId without shortening
  const cleanId = componentId.replace("c_", ""); // Remove c_ prefix but keep the rest

  switch (hookType) {
    case "useState":
      return `state_c_${cleanId}`;
    case "useRef":
      return `ref_c_${cleanId}`;
    case "useEffect":
      return `effect_c_${cleanId}`;
    case "useCallback":
      return `callback_c_${cleanId}`;
    case "useMemo":
      return `memo_c_${cleanId}`;
    default:
      return `hook_c_${cleanId}`;
  }
};

export const removeHookFromCode = (
  code: string,
  hookType: string,
  componentId: string
): string => {
  const varName = generateHookVariableName(hookType, componentId);
  // Sadece hook tanım satırını sil
  // ^\s*const\s+\[?.*?varName.*?\]?\s*=\s*hookType\(.*?\);\s*$
  // Bu satırı, başında ve sonunda yalnızca bir satırı siler şekilde tasarla
  const hookLineRegex = new RegExp(
    `^\\s*const\\s+(?:\\[.*?${varName}.*?\\]|${varName})\\s*=\\s*${hookType}\\([^)]*\\);?\\s*$`,
    "gm"
  );
  code = code.replace(hookLineRegex, "");

  // Import'tan kaldırma mantığı aynı kalabilir
  const remainingHooks = code.match(new RegExp(`${hookType}\\(`, "g"));
  if (!remainingHooks || remainingHooks.length === 0) {
    const reactImportRegex =
      // eslint-disable-next-line no-useless-escape
      /import\s+(React\s*,\s*)?\{([^}]*)\}\s+from\s+['"]react['\"];?\s*/g;
    let match;
    let newCode = code;
    while ((match = reactImportRegex.exec(code)) !== null) {
      const importLine = match[0];
      const hooks = match[2]
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h && h !== hookType);
      let newImport = "";
      if (hooks.length > 0) {
        newImport = match[1]
          ? `import React, { ${hooks.join(", ")} } from 'react';\n`
          : `import { ${hooks.join(", ")} } from 'react';\n`;
      } else {
        newImport = match[1] ? `import React from 'react';\n` : "";
      }
      newCode = newCode.replace(importLine, newImport);
    }
    code = newCode;
  }
  // Duplicate import cleanup aynı kalabilir
  code = cleanupDuplicateImports(code);
  return code;
};

export const insertJSXAtPosition = (
  code: string,
  jsx: string,
  position: { line: number; column: number }
): string => {
  const lines = code.split("\n");

  // JSX kodunu istenen satıra ekle
  lines.splice(position.line, 0, jsx);

  return lines.join("\n");
};

export const generateComponentJSX = (component: ComponentInfo): string => {
  const { type, props } = component;

  const propsString = Object.entries(props)
    .filter(([key, val]) => {
      if (
        key === "children" ||
        !val ||
        typeof val !== "object" ||
        !("value" in val)
      )
        return false;

      const isFunction = val.type === "function";
      const isObject = val.type === "object";
      const isBoolean = typeof val.value === "boolean";

      return (
        val.value !== null &&
        val.value !== undefined &&
        (isFunction || isBoolean || val.value !== "") &&
        (isObject || Object.keys(val.value).length > 0)
      );
    })
    .map(([key, val]) => {
      const propVal =
        val && typeof val === "object" && "value" in val ? val.value : val;

      if (typeof propVal === "string") return `${key}="${propVal}"`;
      if (typeof propVal === "number") return `${key}={${propVal}}`;
      if (typeof propVal === "boolean")
        return propVal ? `${key}` : `${key}={false}`;
      return `${key}={${JSON.stringify(propVal)}}`;
    })
    .join(" ");

  console.log("📝 App: Generated props string:", propsString);

  const children =
    props.children &&
    typeof props.children === "object" &&
    "value" in props.children
      ? props.children.value
      : "";
  const hasProps = propsString.length > 0;
  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    return `<${type} id="${component.id}"${
      hasProps ? " " + propsString : ""
    }>${children}</${type}>`;
  } else {
    return `<${type} id="${component.id}"${
      hasProps ? " " + propsString : ""
    } />`;
  }
};

export const generateHookCode = (
  hookType: string,
  componentId: string,
  componentType: string,
  initialValue?: any
): string => {
  const varName = generateHookVariableName(hookType, componentId);

  switch (hookType) {
    case "useState":
      const defaultValue = getDefaultValueForComponent(
        componentType,
        initialValue
      );
      // Generate proper camelCase setter name from state variable
      const setterName = `set${
        varName.charAt(0).toUpperCase() + varName.slice(1)
      }`;
      return `const [${varName}, ${setterName}] = useState(${defaultValue});`;

    case "useRef":
      return `const ${varName} = useRef(null);`;

    case "useCallback":
      return `const ${varName} = useCallback(() => {\n    // Callback logic here\n  }, []);`;

    case "useMemo":
      return `const ${varName} = useMemo(() => {\n    // Memo logic here\n  }, []);`;

    default:
      return `const ${varName} = ${hookType}();`;
  }
};

const getDefaultValueForComponent = (
  componentType: string,
  initialValue?: any
): string => {
  if (initialValue !== undefined) {
    return typeof initialValue === "string"
      ? `'${initialValue}'`
      : String(initialValue);
  }

  switch (componentType) {
    case "input":
    case "textarea":
      return "''";
    case "checkbox":
      return "false";
    case "select":
      return "''";
    case "button":
      return "false";
    default:
      return "''";
  }
};

export const updateComponentProp = (
  code: string,
  componentId: string,
  propName: string,
  propValue: any
): string => {
  // Special handling for children
  if (propName === "children") {
    return updateComponentChildren(code, componentId, propValue);
  }

  console.log("🔧 updateComponentProp called:", {
    componentId,
    propName,
    propValue,
    propType: typeof propValue,
  });

  // Clean up duplicate imports before parsing
  const cleanCode = cleanupDuplicateImports(code);

  try {
    const ast = parser.parse(cleanCode, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let updatedCode = cleanCode;
    let offset = 0;

    traverse(ast, {
      JSXElement(path) {
        const element = path.node;
        if (t.isJSXIdentifier(element.openingElement.name)) {
          // Find the component with matching ID
          const idAttr = element.openingElement.attributes.find(
            (attr) =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === "id" &&
              attr.value &&
              t.isStringLiteral(attr.value) &&
              attr.value.value === componentId
          );

          if (idAttr) {
            console.log("🎯 Found component with ID:", componentId);
            // Find existing prop or add new one
            const existingPropIndex =
              element.openingElement.attributes.findIndex(
                (attr) =>
                  t.isJSXAttribute(attr) &&
                  t.isJSXIdentifier(attr.name) &&
                  attr.name.name === propName
              );

            console.log("📍 Existing prop index:", existingPropIndex);
            // Generate proper JSX attribute string
            let newPropString: string | null = null;
            let shouldRemoveAttribute = false;

            if (
              propValue === null ||
              propValue === undefined ||
              propValue === ""
            ) {
              shouldRemoveAttribute = true;
              console.log("🗑️ Will remove attribute - value is:", propValue);
            } else if (propValue === true) {
              newPropString = propName; // Boolean true: just the attribute name
              console.log("✅ Boolean true prop:", newPropString);
            } else if (typeof propValue === "string") {
              // Handle event props and JSX expressions
              if (propName.startsWith("on") || propValue.startsWith("{")) {
                // Event props or JSX expressions - ensure proper braces
                if (propValue.startsWith("{") && propValue.endsWith("}")) {
                  newPropString = `${propName}=${propValue}`;
                } else {
                  newPropString = `${propName}={${propValue}}`;
                }
                console.log("🎯 Event/JSX prop:", newPropString);
              } else {
                newPropString = `${propName}="${propValue}"`; // String literal
                console.log("📝 String prop:", newPropString);
              }
            } else if (typeof propValue === "boolean") {
              newPropString = `${propName}={${propValue}}`;
              console.log("🔘 Boolean prop:", newPropString);
            } else {
              newPropString = `${propName}={${propValue}}`; // Other values as JSX expression
              console.log("🔢 Other prop:", newPropString);
            }

            if (existingPropIndex !== -1) {
              // Update existing prop
              const existingProp =
                element.openingElement.attributes[existingPropIndex];
              if (t.isJSXAttribute(existingProp)) {
                const attrStart = existingProp.start! + offset;
                const attrEnd = existingProp.end! + offset;

                console.log(
                  "🔄 Updating existing prop at position:",
                  attrStart,
                  "-",
                  attrEnd
                );
                console.log(
                  "🔄 Old attribute:",
                  updatedCode.slice(attrStart, attrEnd)
                );
                if (shouldRemoveAttribute) {
                  // Remove the entire attribute with proper whitespace handling
                  let removeStart = attrStart;
                  const removeEnd = attrEnd;

                  // Look for whitespace/newline before the attribute
                  while (removeStart > 0) {
                    const char = updatedCode[removeStart - 1];
                    if (
                      char === " " ||
                      char === "\t" ||
                      char === "\n" ||
                      char === "\r"
                    ) {
                      removeStart--;
                    } else {
                      break;
                    }
                  }

                  // Make sure we don't remove too much - keep at least one space if needed
                  const beforeChar =
                    removeStart > 0 ? updatedCode[removeStart - 1] : "";
                  const afterChar =
                    removeEnd < updatedCode.length
                      ? updatedCode[removeEnd]
                      : "";

                  // If we're between two attributes or after tag name, ensure proper spacing
                  if (
                    beforeChar &&
                    beforeChar !== " " &&
                    beforeChar !== "\n" &&
                    beforeChar !== "\t" &&
                    afterChar &&
                    afterChar !== " " &&
                    afterChar !== "\n" &&
                    afterChar !== "\t" &&
                    afterChar !== ">" &&
                    afterChar !== "/"
                  ) {
                    // Insert a space to prevent attributes from merging
                    updatedCode =
                      updatedCode.slice(0, removeStart) +
                      " " +
                      updatedCode.slice(removeEnd);
                    offset -= removeEnd - removeStart - 1; // -1 because we added a space
                  } else {
                    updatedCode =
                      updatedCode.slice(0, removeStart) +
                      updatedCode.slice(removeEnd);
                    offset -= removeEnd - removeStart;
                  }

                  console.log(
                    "🗑️ Removed attribute from",
                    removeStart,
                    "to",
                    removeEnd
                  );
                } else {
                  // Replace the entire attribute
                  if (newPropString) {
                    console.log("🔄 Replacing with:", newPropString);
                    updatedCode =
                      updatedCode.slice(0, attrStart) +
                      newPropString +
                      updatedCode.slice(attrEnd);
                    offset += newPropString.length - (attrEnd - attrStart);
                  }
                }
              }

              // Stop traversal after modifying the target component
              path.stop();
            } else if (!shouldRemoveAttribute && newPropString) {
              // Add new prop
              const insertPos = element.openingElement.name.end! + offset;
              const propToInsert = ` ${newPropString}`;
              console.log(
                "➕ Adding new prop at position",
                insertPos,
                ":",
                propToInsert
              );
              updatedCode =
                updatedCode.slice(0, insertPos) +
                propToInsert +
                updatedCode.slice(insertPos);
              offset += propToInsert.length;
            }

            // Stop traversal after processing the target component
            path.stop();
          }
        }
      },
    });

    console.log(
      "✅ updateComponentProp completed. Code changed:",
      code !== updatedCode
    );
    return updatedCode;
  } catch (error) {
    console.error("Error updating component prop:", error);
    return code;
  }
};

const cleanupDuplicateImports = (code: string): string => {
  // Remove duplicate React imports
  const reactImportRegex =
    /import\s+React(?:\s*,\s*\{[^}]*\})?\s+from\s+['"]react['"];\s*/g;
  const reactImports = code.match(reactImportRegex);

  if (reactImports && reactImports.length > 1) {
    console.log("🔧 Found duplicate React imports:", reactImports.length);

    // Collect all hooks from all imports
    const allHooks = new Set<string>();
    reactImports.forEach((importLine) => {
      const hooksMatch = importLine.match(/\{([^}]*)\}/);
      if (hooksMatch) {
        const hooks = hooksMatch[1]
          .split(",")
          .map((h) => h.trim())
          .filter((h) => h);
        hooks.forEach((hook) => allHooks.add(hook));
      }
    });

    // Remove all React imports
    let cleanedCode = code.replace(reactImportRegex, "");

    // Add single consolidated import
    if (allHooks.size > 0) {
      const consolidatedImport = `import React, { ${Array.from(allHooks).join(
        ", "
      )} } from 'react';\n`;
      cleanedCode = consolidatedImport + cleanedCode;
    } // else: Hiç import ekleme

    console.log("✅ Consolidated imports:", Array.from(allHooks));
    return cleanedCode;
  }

  return code;
};

export const updateComponentProps = (
  code: string,
  componentId: string,
  updates: Record<string, any>
): string => {
  console.log("🔄 updateComponentProps called:", { componentId, updates });

  // Apply each update individually to avoid offset calculation issues
  let updatedCode = code;

  Object.entries(updates).forEach(([propName, propValue]) => {
    console.log(`� Processing update: ${propName} = ${propValue}`);
    updatedCode = updateComponentProp(
      updatedCode,
      componentId,
      propName,
      propValue
    );
  });

  console.log(
    "✅ updateComponentProps completed. Code changed:",
    code !== updatedCode
  );
  return updatedCode;
};

const updateComponentChildren = (
  code: string,
  componentId: string,
  newChildren: string
): string => {
  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let updatedCode = code;
    let offset = 0;

    traverse(ast, {
      JSXElement(path) {
        const element = path.node;
        if (t.isJSXIdentifier(element.openingElement.name)) {
          // Find the component with matching ID
          const idAttr = element.openingElement.attributes.find(
            (attr) =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === "id" &&
              attr.value &&
              t.isStringLiteral(attr.value) &&
              attr.value.value === componentId
          );

          if (idAttr && element.closingElement) {
            // Update children content
            const start = element.openingElement.end! + offset;
            const end = element.closingElement.start! + offset;

            updatedCode =
              updatedCode.slice(0, start) +
              newChildren +
              updatedCode.slice(end);
            offset += newChildren.length - (end - start);

            // Stop traversal after modifying the target component
            path.stop();
          }
        }
      },
    });

    return updatedCode;
  } catch (error) {
    console.error("Error updating component children:", error);
    return code;
  }
};

export function removeComponentAndHooksFromCode(
  code: string,
  componentId: string
): string {
  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
  } catch (e) {
    console.error("Parse error:", e);
    return code;
  }

  // 1. JSX'i sil
  traverse(ast, {
    JSXElement(path) {
      const el = path.node;
      if (t.isJSXIdentifier(el.openingElement.name)) {
        const idAttr = el.openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            attr.name.name === "id" &&
            attr.value &&
            t.isStringLiteral(attr.value) &&
            attr.value.value === componentId
        );
        if (idAttr) {
          path.remove();
        }
      }
    },
  });

  // 2. useState ve useRef hooklarını sil
  traverse(ast, {
    VariableDeclaration(path) {
      const decl = path.node.declarations[0];
      // useState
      if (
        t.isVariableDeclarator(decl) &&
        t.isArrayPattern(decl.id) &&
        t.isCallExpression(decl.init) &&
        t.isIdentifier(decl.init.callee, { name: "useState" }) &&
        decl.id.elements[0] &&
        t.isIdentifier(decl.id.elements[0]) &&
        decl.id.elements[0].name.includes(componentId)
      ) {
        path.remove();
      }
      // useRef
      if (
        t.isVariableDeclarator(decl) &&
        t.isIdentifier(decl.id) &&
        t.isCallExpression(decl.init) &&
        t.isIdentifier(decl.init.callee, { name: "useRef" }) &&
        decl.id.name.includes(componentId)
      ) {
        path.remove();
      }
    },
  });

  // 3. Boş satırları temizle
  let output = generate(ast, { retainLines: true }).code;
  output = output.replace(/\n{3,}/g, "\n\n");
  return output;
}
