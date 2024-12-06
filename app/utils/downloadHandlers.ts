import { Document, Packer, Paragraph } from "docx"; // You'll need to install docx package

export const downloadAsPDF = async (content: string): Promise<void> => {
  // Dynamically import html2pdf only on client side
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.createElement("div");
  element.innerHTML = content;
  document.body.appendChild(element);

  const opt = {
    margin: 1,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: true,
      // Wait for content to be fully rendered
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    // Clean up: remove the temporary element
    document.body.removeChild(element);
  }
};

export const downloadAsWord = async (content: string): Promise<void> => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph({ text: content })],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resume.docx";
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadAsText = (content: string): void => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resume.txt";
  link.click();
  URL.revokeObjectURL(url);
};
