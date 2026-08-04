// ============================================================
// FILE: app/lib/export.ts
// PURPOSE: Utility functions for exporting content
// ============================================================

import content from '../data/content.json';

export interface ExportFormat {
    markdown: string;
    json: string;
    html: string;
}

/**
 * Generates markdown from the content data
 */
export function generateMarkdown(): string {
    const data = content;

    let markdown = `# ${data.site.title}\n\n`;
    markdown += `*${data.site.subtitle}*\n\n`;
    markdown += `---\n\n`;

    // Hero
    markdown += `## ${data.hero.title}\n\n`;
    markdown += `${data.hero.subtitle}\n\n`;
    markdown += `---\n\n`;

    // Problem
    markdown += `## ${data.problem.title}\n\n`;
    data.problem.points.forEach((point: string) => {
        markdown += `- ${point}\n`;
    });
    markdown += `\n**SAP Perspective:** ${data.problem.sapPerspective}\n\n`;
    markdown += `---\n\n`;

    // Approach
    markdown += `## ${data.approach.title}\n\n`;
    markdown += `${data.approach.intro}\n\n`;
    data.approach.steps.forEach((step: any) => {
        markdown += `### ${step.step}\n`;
        markdown += `${step.description}\n\n`;
    });
    markdown += `**SAP Perspective:** ${data.approach.sapPerspective}\n\n`;
    markdown += `---\n\n`;

    // Results
    markdown += `## ${data.results.title}\n\n`;
    data.results.cards.forEach((card: any) => {
        markdown += `### ${card.icon} ${card.title}\n`;
        markdown += `- **Metric:** ${card.metric} (${card.metricLabel})\n`;
        markdown += `- ${card.description}\n`;
        markdown += `- *Impact:* ${card.impact}\n\n`;
    });
    markdown += `**SAP Perspective:** ${data.results.sapPerspective}\n\n`;
    markdown += `---\n\n`;

    // Bridge
    markdown += `## ${data.bridge.title}\n\n`;
    markdown += `${data.bridge.intro}\n\n`;
    data.bridge.points.forEach((point: string) => {
        markdown += `- ${point}\n`;
    });
    markdown += `\n**Legacy:** ${data.bridge.legacyLabel} → **${data.bridge.governanceLabel}** → **${data.bridge.modernLabel}**\n\n`;
    markdown += `**SAP Perspective:** ${data.bridge.sapPerspective}\n\n`;
    markdown += `---\n\n`;

    // CTA
    markdown += `## ${data.cta.title}\n\n`;
    data.cta.pillars.forEach((pillar: any) => {
        markdown += `### ${pillar.icon} ${pillar.title}\n`;
        markdown += `${pillar.description}\n\n`;
    });
    markdown += `**SAP Perspective:** ${data.cta.sapPerspective}\n\n`;
    markdown += `---\n\n`;

    // Contact
    markdown += `## Contact\n\n`;
    markdown += `- **Email:** ${data.cta.contact.email}\n`;
    markdown += `- **LinkedIn:** ${data.cta.contact.linkedin}\n`;
    markdown += `- **Schedule:** ${data.cta.contact.calendar}\n\n`;
    markdown += `---\n\n`;
    markdown += `*${data.footer.copyright} | ${data.footer.version}*`;

    return markdown;
}

/**
 * Generates JSON string of the content data
 */
export function generateJSON(): string {
    return JSON.stringify(content, null, 2);
}

/**
 * Generates HTML from the content data
 */
export function generateHTML(): string {
    const data = content;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.site.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 40px 20px; line-height: 1.7; color: #2D3748; }
    h1 { color: #0F4C8A; font-size: 2.5rem; border-bottom: 3px solid #00B4A0; padding-bottom: 10px; }
    h2 { color: #0F4C8A; font-size: 2rem; margin-top: 40px; }
    h3 { color: #0F4C8A; font-size: 1.3rem; margin-top: 30px; }
    .sap { background: #E8EEF4; border-left: 4px solid #00B4A0; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .sap-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #00B4A0; }
    .metric { color: #FFD700; font-size: 2rem; font-weight: 700; }
    hr { border: none; border-top: 2px solid #E8EEF4; margin: 40px 0; }
    .footer { text-align: center; color: #4A5568; font-size: 0.9rem; margin-top: 60px; padding-top: 20px; border-top: 1px solid #E8EEF4; }
  </style>
</head>
<body>
  <h1>${data.site.title}</h1>
  <p><em>${data.site.subtitle}</em></p>
  <hr>

  <h2>${data.hero.title}</h2>
  <p>${data.hero.subtitle}</p>
  <hr>

  <h2>${data.problem.title}</h2>
  <ul>
    ${data.problem.points.map((p: string) => `<li>${p}</li>`).join('')}
  </ul>
  <div class="sap">
    <div class="sap-label">SAP Perspective</div>
    <p>${data.problem.sapPerspective}</p>
  </div>
  <hr>

  <h2>${data.approach.title}</h2>
  <p>${data.approach.intro}</p>
  ${data.approach.steps.map((step: any) => `
    <h3>${step.step}</h3>
    <p>${step.description}</p>
  `).join('')}
  <div class="sap">
    <div class="sap-label">SAP Perspective</div>
    <p>${data.approach.sapPerspective}</p>
  </div>
  <hr>

  <h2>${data.results.title}</h2>
  ${data.results.cards.map((card: any) => `
    <h3>${card.icon} ${card.title}</h3>
    <p><span class="metric">${card.metric}</span> (${card.metricLabel})</p>
    <p>${card.description}</p>
    <p><em>Impact: ${card.impact}</em></p>
  `).join('')}
  <div class="sap">
    <div class="sap-label">SAP Perspective</div>
    <p>${data.results.sapPerspective}</p>
  </div>
  <hr>

  <h2>${data.bridge.title}</h2>
  <p>${data.bridge.intro}</p>
  <ul>
    ${data.bridge.points.map((p: string) => `<li>${p}</li>`).join('')}
  </ul>
  <p><strong>${data.bridge.legacyLabel}</strong> → <strong>${data.bridge.governanceLabel}</strong> → <strong>${data.bridge.modernLabel}</strong></p>
  <div class="sap">
    <div class="sap-label">SAP Perspective</div>
    <p>${data.bridge.sapPerspective}</p>
  </div>
  <hr>

  <h2>${data.cta.title}</h2>
  ${data.cta.pillars.map((pillar: any) => `
    <h3>${pillar.icon} ${pillar.title}</h3>
    <p>${pillar.description}</p>
  `).join('')}
  <div class="sap">
    <div class="sap-label">SAP Perspective</div>
    <p>${data.cta.sapPerspective}</p>
  </div>
  <hr>

  <h2>Contact</h2>
  <ul>
    <li><strong>Email:</strong> <a href="mailto:${data.cta.contact.email}">${data.cta.contact.email}</a></li>
    <li><strong>LinkedIn:</strong> <a href="${data.cta.contact.linkedin}">${data.cta.contact.linkedin}</a></li>
    <li><strong>Schedule:</strong> <a href="${data.cta.contact.calendar}">${data.cta.contact.calendar}</a></li>
  </ul>

  <div class="footer">
    <p>${data.footer.copyright} | ${data.footer.version}</p>
    <p>~Å~</p>
  </div>
</body>
</html>`;
}

/**
 * Downloads a file with the given content and filename
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Generates all export formats at once
 */
export function generateAllFormats(): ExportFormat {
    return {
        markdown: generateMarkdown(),
        json: generateJSON(),
        html: generateHTML(),
    };
}