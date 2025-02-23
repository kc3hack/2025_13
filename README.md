# Accent Guessor

![プロダクト名](https://kc3.me/cms/wp-content/uploads/2024/11/hack25-eyecatch.png)

<!-- プロダクト名・イメージ画像を差し変えてください -->

## チーム名

チーム 13 KDIX.Security

## 背景

関西と言えば関西弁！温かみのある話し方が特徴です。関西弁に限らず、全国には独特で魅力的な方言が沢山あります。  
そこで、日本のどの方言を話しているかを推測する Web サービスを開発することにしました。英語のアクセントがどの国のものであるか推測する[BoldVoice Accent Oracle](https://start.boldvoice.com/accent-oracle)に着想を得ました。

## プロダクト説明

発話者の訛りから方言を識別する Web サービスです。  
表示された文章を読み上げると、その声を独自に作成した AI が解析してどの方言の特徴に近いかを判断します。  
関西に限らず全国の方言を判別します。

## 操作説明・デモ動画

[デモ動画はこちら](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

<!-- 開発したプロダクトの操作説明について入力してください。また、操作説明デモ動画があれば、埋め込みやリンクを記載してください -->

## 注力したポイント
<!-- 内容をさらに膨らませる -->

今回の作品では1からAIを作るという試みを行いました。
判定精度を上げるために、パラメータを操作して何度も学習を行い、精度を上げていきました。

また、[元ネタ](https://start.boldvoice.com/accent-guesser)のランディングページに表示されていた地球儀を、Three.jsを使用して再現しました。

### 技術面

<!-- @kerthical -->

既存の AI を用いるのではなく、データセットを用いて 1 から AI を作成しています。

### デザイン面

Tailwind CSS を駆使して[元ネタ](https://start.boldvoice.com/accent-oracle)のデザインを忠実に再現しました。レスポンシブ対応しています。  
ランディングページの地球儀は Three.js で描画しています。

## 使用技術

### フロントエンド

- Typescript
- Remix
- Tailwind CSS
- Jotai
- Three.js

### バックエンド

<!-- @kerthical -->

- Python
- LitServe
- TODO
