/**
 * @file export-licenses.js
 * @description 依存パッケージからライセンス情報を抽出して JSON に出力するスクリプトだよ！
 * @author Gemini (Antigravity)
 */

import fs from 'node:fs';
import path from 'node:path';

try {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  // 直接依存しているパッケージ名を合体
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  const results = {};

  for (const name of deps) {
    try {
      const depPkgPath = path.join(process.cwd(), 'node_modules', name);
      if (!fs.existsSync(depPkgPath)) {
        console.warn(`[Warning] Package folder not found for ${name}, possibly not installed.`);
        continue;
      }
      const info = JSON.parse(fs.readFileSync(path.join(depPkgPath, 'package.json'), 'utf8'));

      // LICENSEファイルを探す
      const files = fs.readdirSync(depPkgPath);
      const licenseFileName = files.find(f => /^(LICENSE|LICENCE|COPYING)/i.test(f));
      const licenseText = licenseFileName
        ? fs.readFileSync(path.join(depPkgPath, licenseFileName), 'utf8')
        : `License: ${info.license || 'Unknown'}`; // ファイルがない場合は種類だけ記載

      function resolveRepositoryUrl(repo) {
        if (!repo) return undefined;
        let urlStr = typeof repo === 'string' ? repo : repo.url;
        if (!urlStr) return undefined;

        if (urlStr.startsWith('gist:')) urlStr = 'https://gist.github.com/' + urlStr.slice(5);
        else if (urlStr.startsWith('bitbucket:')) urlStr = 'https://bitbucket.org/' + urlStr.slice(10);
        else if (urlStr.startsWith('gitlab:')) urlStr = 'https://gitlab.com/' + urlStr.slice(7);
        else if (urlStr.startsWith('github:')) urlStr = 'https://github.com/' + urlStr.slice(7);
        else if (/^[a-zA-Z0-9_\-\.]+\/[a-zA-Z0-9_\-\.]+$/.test(urlStr)) {
          urlStr = 'https://github.com/' + urlStr;
        } else {
          urlStr = urlStr.replace(/^git\+/, '');
          urlStr = urlStr.replace(/^git:\/\//, 'https://');
          urlStr = urlStr.replace(/^ssh:\/\/git@/, 'https://');
          
          if (urlStr.startsWith('git@')) {
            const match = urlStr.match(/^git@([^:]+):(.+)$/);
            if (match) urlStr = `https://${match[1]}/${match[2]}`;
          }
        }
        
        try {
          // 安全性検証：有効なURLであり、http/httpsのみ許可する
          const parsed = new URL(urlStr);
          if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.toString();
          }
        } catch {
          // パース失敗した不正な文字列や、URL形式でない場合は除外
        }
        return undefined;
      }

      let repoUrl = resolveRepositoryUrl(info.repository);

      results[name] = {
        version: info.version,
        license: info.license,
        homepage: info.homepage || "",
        repository: repoUrl,
        text: licenseText
      };
    } catch {
      console.warn(`[Warning] Could not find license or parse data for ${name}`);
    }
  }

  const outputPath = path.join(process.cwd(), 'src/generated/licenses.json');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log('✅ ライセンスファイルを出力したよ！ (src/generated/licenses.json)');
} catch (err) {
  console.error('❌ ライセンスの抽出中にエラーが発生したよ:', err);
  process.exit(1);
}
