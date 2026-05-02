/**
 * @file create-component.ts
 * @description ReactコンポーネントとCSSモジュールの雛形を作成するスクリプトだよ！
 * @author Gemini (Antigravity)
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../../');
const COMPONENTS_ROOT = path.join(PROJECT_ROOT, 'src/react-app/components');

const COMPONENT_TYPES = ['ui', 'features', 'layouts'] as const;
type ComponentType = (typeof COMPONENT_TYPES)[number];

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  let [type, name] = process.argv.slice(2);

  if (!type || !COMPONENT_TYPES.includes(type as ComponentType)) {
    console.log('コンポーネントの種類を選んでね！');
    COMPONENT_TYPES.forEach((t, i) => console.log(`${i + 1}: ${t}`));
    const choice = await question('番号を入力してね: ');
    type = COMPONENT_TYPES[parseInt(choice) - 1];
    if (!type) {
      console.error('無効な選択だよ！');
      process.exit(1);
    }
  }

  if (!name) {
    name = await question('コンポーネント名を kebab-case で入力してね (例: my-component): ');
    if (!name) {
      console.error('名前を入力してね！');
      process.exit(1);
    }
  }

  const pascalName = toPascalCase(name);
  const targetDir = path.join(COMPONENTS_ROOT, type, name);

  if (fs.existsSync(targetDir)) {
    console.error(`エラー: ${targetDir} はもう存在するよ！`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const tsxPath = path.join(targetDir, `${name}.tsx`);
  const cssPath = path.join(targetDir, `${name}.module.css`);

  const tsxContent = `import styles from "./${name}.module.css";

export const ${pascalName} = () => {
  return (

  );
};
`;

  const cssContent = ``;

  fs.writeFileSync(tsxPath, tsxContent);
  fs.writeFileSync(cssPath, cssContent);

  console.log(`✨ コンポーネント "${pascalName}" を作成したよ！`);
  console.log(`📍 作成したファイル:`);
  console.log(`- ${tsxPath}`);
  console.log(`- ${cssPath}`);

  rl.close();
}

main().catch((err) => {
  console.error('エラーが発生したよ:', err);
  process.exit(1);
});
