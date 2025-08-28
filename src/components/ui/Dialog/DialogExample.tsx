import React, { useState } from 'react'
import Dialog from './Dialog'

const DialogExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleMaximize = () => {
    console.log('Dialog maximized - should cover full screen')
  }

  const handleRestore = () => {
    console.log('Dialog restored - should return to normal size')
  }

  return (
    <div className="p-4">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Dialog with Window Controls
      </button>
      
      <Dialog
        isOpen={isOpen}
        onRequestClose={handleClose}
        onClose={handleClose}
        onMaximize={handleMaximize}
        onRestore={handleRestore}
        width={600}
        height={400}
        showWindowControls={true}
        contentClassName="p-6"
      >
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Dialog with Window Controls</h2>
          <div className="flex-1 overflow-auto">
            <p className="mb-4">
              This dialog has maximize and restore buttons in the top-right corner.
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-6">
              <li>Click the maximize button (□) to make the dialog fullscreen</li>
              <li>Click the restore button (⧉) to return to normal size</li>
              <li>Click the close button (×) to close the dialog</li>
            </ul>
            <div className="space-y-4">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-600">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DialogExample
