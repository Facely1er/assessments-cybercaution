import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF with autotable plugin
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface SectionScore {
  title: string;
  percentage: number;
}

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  effort: string;
  timeframe: string;
  steps: string[];
}

export const generateResultsPdf = (
  title: string,
  overallScore: number,
  sectionScores: SectionScore[],
  date: string,
  filename = 'assessment-results.pdf'
) => {
  const doc = new jsPDF();
  let y = 20;

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(title, 105, y, { align: 'center' });
  y += 10;

  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${date}`, 105, y, { align: 'center' });
  y += 20;

  // Add overall score
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text(`Overall Compliance Score: ${overallScore}%`, 20, y);
  y += 10;

  // Risk level
  let riskLevel = 'Low Risk';
  let riskColor = [0, 150, 0]; // Green
  
  if (overallScore < 80) {
    riskLevel = 'Moderate Risk';
    riskColor = [0, 100, 200]; // Blue
  }
  if (overallScore < 60) {
    riskLevel = 'High Risk';
    riskColor = [255, 150, 0]; // Orange
  }
  if (overallScore < 40) {
    riskLevel = 'Critical Risk';
    riskColor = [200, 0, 0]; // Red
  }

  doc.setFontSize(12);
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.text(`Risk Level: ${riskLevel}`, 20, y);
  y += 20;

  // Add section scores table
  const sectionData = sectionScores.map(section => [section.title, `${section.percentage}%`]);
  
  doc.autoTable({
    head: [['Section', 'Score']],
    body: sectionData,
    startY: y,
    headStyles: { fillColor: [60, 100, 240] },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });
  
  y = (doc as any).lastAutoTable.finalY + 20;

  // Add summary
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Summary', 20, y);
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  let summaryText = `This assessment evaluated compliance with industry standards and best practices. `;
  summaryText += `The overall score of ${overallScore}% indicates `;
  
  if (overallScore >= 80) {
    summaryText += 'a strong compliance posture with minimal gaps. Continued monitoring and maintenance is recommended.';
  } else if (overallScore >= 60) {
    summaryText += 'a generally sound compliance posture with some areas needing improvement.';
  } else if (overallScore >= 40) {
    summaryText += 'significant compliance gaps that require attention. Addressing the high-priority recommendations is advised.';
  } else {
    summaryText += 'critical compliance gaps that need immediate remediation to reduce security risks.';
  }

  const splitSummary = doc.splitTextToSize(summaryText, 170);
  doc.text(splitSummary, 20, y);

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('CyberCaution Assessment Report', 20, 290);
    doc.text(`${new Date().toISOString().split('T')[0]}`, 190, 290, { align: 'right' });
  }

  // Save the PDF
  doc.save(filename);
};

export const generateRecommendationsPdf = (
  title: string,
  recommendations: RecommendationItem[],
  date: string, 
  filename = 'recommendations.pdf'
) => {
  const doc = new jsPDF();
  let y = 20;

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(title, 105, y, { align: 'center' });
  y += 10;

  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${date}`, 105, y, { align: 'center' });
  y += 20;

  // Group recommendations by priority for the summary
  const criticalCount = recommendations.filter(r => r.priority === 'critical').length;
  const highCount = recommendations.filter(r => r.priority === 'high').length;
  const mediumCount = recommendations.filter(r => r.priority === 'medium').length;
  const lowCount = recommendations.filter(r => r.priority === 'low').length;

  // Add summary
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Recommendations Summary', 20, y);
  y += 10;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Total Recommendations: ${recommendations.length}`, 20, y);
  y += 5;
  doc.text(`Critical: ${criticalCount}`, 20, y);
  y += 5;
  doc.text(`High: ${highCount}`, 20, y);
  y += 5;
  doc.text(`Medium: ${mediumCount}`, 20, y);
  y += 5;
  doc.text(`Low: ${lowCount}`, 20, y);
  y += 15;

  // Add recommendations by priority
  const priorityOrder = ['critical', 'high', 'medium', 'low'];
  
  for (const priority of priorityOrder) {
    const priorityRecs = recommendations.filter(r => r.priority === priority);
    if (priorityRecs.length === 0) continue;
    
    // Priority header
    const priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1);
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(`${priorityLabel} Priority Recommendations`, 20, y);
    y += 10;
    
    // Add each recommendation
    for (const rec of priorityRecs) {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text(rec.title, 20, y);
      y += 6;
      
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const descriptionLines = doc.splitTextToSize(rec.description, 170);
      doc.text(descriptionLines, 20, y);
      y += descriptionLines.length * 5 + 2;
      
      // Category and effort
      doc.text(`Category: ${rec.category}`, 20, y);
      y += 5;
      doc.text(`Effort: ${rec.effort.charAt(0).toUpperCase() + rec.effort.slice(1)}`, 20, y);
      y += 5;
      doc.text(`Timeframe: ${rec.timeframe.charAt(0).toUpperCase() + rec.timeframe.slice(1)}`, 20, y);
      y += 8;
      
      // Implementation steps
      if (rec.steps.length > 0) {
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        doc.text('Implementation Steps:', 20, y);
        y += 5;
        
        doc.setTextColor(60, 60, 60);
        for (let i = 0; i < rec.steps.length; i++) {
          const step = rec.steps[i];
          const stepLines = doc.splitTextToSize(`${i+1}. ${step}`, 160);
          doc.text(stepLines, 30, y);
          y += stepLines.length * 5 + 2;
        }
      }
      
      y += 10; // Space between recommendations
    }
  }

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('CyberCaution Recommendations', 20, 290);
    doc.text(`${new Date().toISOString().split('T')[0]}`, 190, 290, { align: 'right' });
  }

  // Save the PDF
  doc.save(filename);
};