const fs = require('fs');
const path = require('path');

function run(filePath) {
  const ts = require('typescript');
  const code = fs.readFileSync(filePath, 'utf8');
  const transpile = ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      allowJs: true,
    },
    fileName: filePath
  });

  console.log('File:', filePath);
  if (transpile.diagnostics && transpile.diagnostics.length) {
    transpile.diagnostics.forEach(d => {
      const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      if (d.file && d.start != null) {
        const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
        console.log(`  Diagnostic: ${msg} (${line + 1}:${character + 1})`);
      } else {
        console.log('  Diagnostic:', msg);
      }
    });
  } else {
    console.log('  No diagnostics from transpileModule.');
  }
}

const targets = [
  path.join(__dirname, '..', 'app', '(calculators)', 'finance', 'cpm-calculator', 'page.tsx'),
  path.join(__dirname, '..', 'app', '_components', 'calculators', 'CPMCalculator.tsx')
];

for (const t of targets) {
  try { run(t); } catch (e) { console.error('Error processing', t, e.message); }
}
