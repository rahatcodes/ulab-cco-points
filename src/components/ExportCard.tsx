import React, { useState } from 'react';
import { Download, Image, FileText, Loader } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportCardProps {
  studentId: string;
}

export const ExportCard: React.FC<ExportCardProps> = ({ studentId }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'image' | 'pdf' | null>(null);

  const exportAsImage = async () => {
    setIsExporting(true);
    setExportType('image');
    
    try {
      const dashboard = document.getElementById('dashboard-content');
      if (!dashboard) return;

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        width: dashboard.scrollWidth,
        height: dashboard.scrollHeight,
      });

      const link = document.createElement('a');
      link.download = `ULAB_CCO_Dashboard_${studentId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Error exporting image. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    setExportType('pdf');
    
    try {
      const dashboard = document.getElementById('dashboard-content');
      if (!dashboard) return;

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        width: dashboard.scrollWidth,
        height: dashboard.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let imgWidth, imgHeight;
      if (imgAspectRatio > pdfAspectRatio) {
        imgWidth = pdfWidth;
        imgHeight = pdfWidth / imgAspectRatio;
      } else {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * imgAspectRatio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`ULAB_CCO_Report_${studentId}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
          <Download className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Export Your Dashboard</h3>
          <p className="text-sm text-gray-600">Download your progress summary</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={exportAsImage}
          disabled={isExporting}
          className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isExporting && exportType === 'image' ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Image className="w-5 h-5" />
          )}
          <span className="font-semibold">Download as Image</span>
        </button>

        <button
          onClick={exportAsPDF}
          disabled={isExporting}
          className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isExporting && exportType === 'pdf' ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <FileText className="w-5 h-5" />
          )}
          <span className="font-semibold">Download as PDF</span>
        </button>
      </div>
    </div>
  );
};