import { ReportGeneratedDto, ReportTemplateDto, ReportCategoryDto } from '@/proxy/reports/models'
import ReportsService from '@/services/reports.service'
import { useState, useCallback, useEffect } from 'react'

const reportsService = new ReportsService()

interface ReportData {
  templates: ReportTemplateDto[]
  generatedReports: ReportGeneratedDto[]
  categories: ReportCategoryDto[]
}

export const useReports = () => {
  const [data, setData] = useState<ReportData>({
    templates: [],
    generatedReports: [],
    categories: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 200))

        const [templatesResponse, generatedReportsResponse, categoriesResponse] = await Promise.all(
          [
            reportsService.getTemplates({
              sorting: '',
              skipCount: 0,
              maxResultCount: 1000,
            }),
            reportsService.getGeneratedReports({
              sorting: '',
              skipCount: 0,
              maxResultCount: 1000,
            }),
            reportsService.getCategories(),
          ],
        )

        setData({
          templates: templatesResponse.data.items || [],
          generatedReports: generatedReportsResponse.data.items || [],
          categories: categoriesResponse.data || [],
        })
      } catch (error) {
        console.error('Error loading data:', error)
        // Fallback to default data
        setData({
          templates: [],
          generatedReports: [],
          categories: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const createTemplate = useCallback(
    async (template: ReportTemplateDto) => {
      setIsLoading(true)
      try {
        const response = await reportsService.createTemplate(template as ReportTemplateDto)
        const newTemplate = response.data as ReportTemplateDto

        // Update local state
        setData((prevData) => ({
          ...prevData,
          templates: [...prevData.templates, newTemplate],
        }))

        return newTemplate
      } catch (error) {
        console.error('Error creating template:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [data],
  )

  const updateTemplate = useCallback(async (id: string, updates: Partial<ReportTemplateDto>) => {
    setIsLoading(true)
    try {
      // First get the current template to merge with updates
      const currentTemplateResponse = await reportsService.getTemplateById(id)
      const currentTemplate = currentTemplateResponse.data as ReportTemplateDto

      console.log('Current Template:', currentTemplate)

      const updatedTemplate = { ...currentTemplate, ...updates }
      await reportsService.updateTemplate(id, updatedTemplate)

      // Update local state
      setData((prevData) => ({
        ...prevData,
        templates: prevData.templates.map((template) =>
          template.id === id
            ? { ...template, ...updates, lastModificationTime: new Date().toISOString() }
            : template,
        ),
      }))
    } catch (error) {
      console.error('Error updating template:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteTemplate = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      await reportsService.deleteTemplate(id)

      // Update local state
      setData((prevData) => ({
        ...prevData,
        templates: prevData.templates.filter((template) => template.id !== id),
      }))
    } catch (error) {
      console.error('Error deleting template:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateReport = useCallback(
    async (templateId: string, parameterValues: Record<string, string>) => {
      setIsLoading(true)
      try {
        const reportData = {
          templateId,
          parameters: parameterValues,
        }

        const response = await reportsService.generateReport(reportData)
        const report = response.data as ReportGeneratedDto

        if (report) {
          // Update local state
          setData((prevData) => ({
            ...prevData,
            generatedReports: [...prevData.generatedReports, report],
          }))
        }

        return report
      } catch (error) {
        console.error('Error generating report:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const getReportById = useCallback(
    async (reportId: string) => {
      try {
        const response = await reportsService.getGeneratedReportById(reportId)
        return response.data as ReportGeneratedDto
      } catch (error) {
        console.error('Error getting report by id:', error)
        // Fallback to local data
        return data.generatedReports.find((report) => report.id === reportId)
      }
    },
    [data.generatedReports],
  )

  const getTemplateById = useCallback(
    async (templateId: string) => {
      try {
        const response = await reportsService.getTemplateById(templateId)
        return response.data as ReportTemplateDto
      } catch (error) {
        console.error('Error getting template by id:', error)
        // Fallback to local data
        return data.templates.find((template) => template.id === templateId)
      }
    },
    [data.templates],
  )

  const loadTemplatesByCategory = useCallback(async (categoryName?: string) => {
    setIsLoading(true)
    try {
      const templatesResponse = await reportsService.getTemplates({
        sorting: '',
        skipCount: 0,
        maxResultCount: 1000,
        categoryName: categoryName && categoryName !== 'Tümü' ? categoryName : undefined,
      })

      setData((prevData) => ({
        ...prevData,
        templates: templatesResponse.data.items || [],
      }))
    } catch (error) {
      console.error('Error loading templates by category:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    templates: data.templates,
    generatedReports: data.generatedReports,
    categories: data.categories,
    isLoading,
    setIsLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    generateReport,
    getReportById,
    getTemplateById,
    loadTemplatesByCategory,
  }
}
