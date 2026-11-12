# CS Learning Hub

專案 Repository：[juncheng0909/w9](https://github.com/juncheng0909/w9)。正式網站：[CS Learning Hub](https://juncheng0909.github.io/w9/)。已完成 GitHub Actions 部署與瀏覽器驗收，詳見 `docs/VERIFICATION.md`。

以繁體中文整理資工核心概念的靜態學習網站，也是生成式 AI 第九週「建立自己的 AGENTS.md」作業。重點是以規則與共用版型持續擴充知識內容。

目前包含首頁、Stack 堆疊、BST 二元搜尋樹、Proof by Contradiction 反證法。提供 RWD、標題／關鍵字／內文搜尋、分類篩選、文章目錄、前後篇導覽、程式範例及可展開的練習解答。沒有後端、外部字型或第三方套件。

## 立即預覽

下載後可直接開啟 `dist/index.html` 閱讀所有文章；搜尋使用 JavaScript 模組，請用本機伺服器或 GitHub Pages 存取。

安裝 Node.js 22 以上，在本專案資料夾執行：

```sh
npm run check
npm run dev
```

開啟 http://127.0.0.1:4173；按 Ctrl+C 停止。無須 npm install。`npm run build` 重新產生 `dist/`；`npm test` 檢查既有產物與教學範例。

若只有 Node.js 而沒有 npm（本次執行環境即如此），可依序使用等效指令：

```sh
node scripts/build.mjs
node --test tests/site.test.mjs
node scripts/serve.mjs
```

## 專案結構

```text
AGENTS.md                    AI 開發與內容規則
content/articles.json        文章唯一來源
templates/article-template.json  新文章範本
scripts/build.mjs            共用靜態網頁產生器
scripts/serve.mjs            本機預覽
assets/                     共用樣式、搜尋功能與圖示
tests/site.test.mjs          自動檢查
dist/                       完整可部署網站
docs/DEPLOYMENT.md           GitHub Pages 操作
docs/SUBMISSION.md           作業繳交範本
docs/VERIFICATION.md         檢查紀錄
.github/workflows/check.yml  GitHub 自動檢查
.github/workflows/pages.yml  GitHub Pages 自動部署
```

## 新增文章

先讀 `AGENTS.md`，複製範本物件至 `content/articles.json`，填入唯一 slug、標題、分類、首頁圖示 glyph、摘要、關鍵字與章節。執行 `npm run check`，首頁卡片、分類、搜尋、文章導覽與目錄都會由相同資料自動產生。產物只由程式產生，不要直接修改 `dist/`。新增範例時應補具體輸出與邊界測試。

例如可請 AI：「依 AGENTS.md 與文章範本新增 Queue，沿用樣式並通過檢查。」本次三篇文章使用同一個產生器，展示相同規則可套用到資料結構與數學主題。

## 部署與繳交

建議將此資料夾完整上傳至獨立的 GitHub Repository；不要上傳父資料夾內的其他作業。最簡單的 GitHub Pages 方法是使用 `main` 分支的 `/docs` 資料夾，但本專案 `docs` 放說明文件，因此採下列二選一：

- **建議：** 專案已包含 `.github/workflows/pages.yml`。依 `docs/DEPLOYMENT.md` 啟用 Pages 的 GitHub Actions 發布來源，自動部署 `dist/`。
- **手動：** 另外建立僅含 `dist/` 內容的網站 repository，以 main 的 root 發布。完整來源仍須放在繳交用 repository。

作業範本見 `docs/SUBMISSION.md`。GitHub 與網站連結在登入、建立 repository 與成功部署後填入，不能用本機網址繳交。

## 驗證範圍

`npm run check` 檢查站內連結、錨點、頁面基本結構、文章欄位、搜尋條件、Stack 與 BST 可執行範例。RWD 與鍵盤操作另需瀏覽器檢查；實際完成紀錄見 `docs/VERIFICATION.md`。數學內容以人工檢查論證結構，不把數值測試當作證明。

發布後可執行 `npm run test:live`（或 `node scripts/check-live.mjs`），逐一確認正式站的四頁 HTML、CSS、搜尋模組與圖示回應 200，且與本機 `dist/` 完全一致。此項需要網路；網站互動與手機版仍以瀏覽器實測。

## 內容與製作說明

本網站由使用者規劃主題，AI 協助撰寫、實作及檢查。文章為原創教學整理；圖解使用 HTML／SVG，不依賴外部圖片。上線前請自行閱讀內容與填寫個人繳交資訊。尚未指定開源授權；若要授權他人重用，可再新增合適的 LICENSE。
