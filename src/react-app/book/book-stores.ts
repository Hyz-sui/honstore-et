import { sjisEncodeUriComponent } from "../../utilities/string-utility";

export type BookStore = {
  label: string;
  urlConstructor: (query: string) => string;
  id: string;
  note?: string;
};

export type BookStoresEnumeration = {
  [key: string]: BookStore
}

export const bookStores: {
  onlineRealBook: BookStoresEnumeration,
  eBook: BookStoresEnumeration,
  realStore: BookStoresEnumeration,
  comicSpecialtyStore: BookStoresEnumeration,
  used: BookStoresEnumeration,
  bibliography: BookStoresEnumeration,
  library: BookStoresEnumeration,
} = {
  onlineRealBook: {
    /** `https://www.e-hon.ne.jp/bec/SA/List?mode=speed&spKeyword={クエリ}&target=1&button=btnSpeed` */
    eHon: {
      label: "全国書店ネットワーク e-hon",
      // Shift-JIS
      urlConstructor: (query: string) => `https://www.e-hon.ne.jp/bec/SA/List?mode=speed&spKeyword=${sjisEncodeUriComponent(query)}&target=1&button=btnSpeed`,
      id: "qriALt-I4XEAMWefr2PXP",
    },

    /** https://www.honyaclub.com/shop/goods/search.aspx?cat_p=00&search=%8C%9F%8D%F5&keyw={クエリ} */
    honyaclub: {
      label: "Honya Club",
      // Shift-JIS
      urlConstructor: (query: string) => `https://www.honyaclub.com/shop/goods/search.aspx?cat_p=00&search=%8C%9F%8D%F5&keyw=${sjisEncodeUriComponent(query)}`,
      id: "ABDhQCxLVOv9Duv_1s2_m",
    },

    /** https://www.maruzenjunkudo.co.jp/search?item_name=&q={クエリ} */
    maruzenJunkudo: {
      label: "丸善ジュンク堂",
      urlConstructor: (query: string) => `https://www.maruzenjunkudo.co.jp/search?item_name=&q=${encodeURIComponent(query)}`,
      id: "QSXzqPo-96UwvZ-bcmbXC",
    },

    /** https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp?qs=true&ptk=01&q={クエリ} */
    kinokuniya: {
      label: "紀伊國屋書店",
      urlConstructor: (query: string) => `https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp?qs=true&ptk=01&q=${encodeURIComponent(query)}`,
      id: "qD289FwAYUIwPdtOuMhF4",
    },

    /** https://books.rakuten.co.jp/search?sitem={クエリ}&g=001 */
    rakuten: {
      label: "楽天",
      urlConstructor: (query: string) => `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(query)}&g=001`,
      id: "uwQ8JlmA-4o96dPi5wW9l",
    },

    /** https://www.yodobashi.com/category/81001/?word={クエリ} */
    yodobashi: {
      label: "ヨドバシ",
      urlConstructor: (query: string) => `https://www.yodobashi.com/category/81001/?word=${encodeURIComponent(query)}`,
      id: "7VeR-zXvwIErh6gVofKM_",
    },

    /** https://7net.omni7.jp/search/?sort=recommend&keyword={クエリ}&siteCateCode=002000 */
    sevenNet: {
      label: "セブンネットショッピング",
      urlConstructor: (query: string) => `https://7net.omni7.jp/search/?sort=recommend&keyword=${encodeURIComponent(query)}&siteCateCode=002000`,
      id: "s8wj_1KgnDfADtVpRDhOn",
    },

    /** https://tower.jp/search/item/{クエリ} */
    tower: {
      label: "タワーレコードオンライン",
      urlConstructor: (query: string) => `https://tower.jp/search/item/${encodeURIComponent(query)}`,
      id: "Mehh4rUPmM4BeLEcmqcDO",
    },

    /** https://www.hmv.co.jp/search/category_24/keyword_{クエリ}/ */
    hmv: {
      label: "HMV&BOOKS online",
      urlConstructor: (query: string) => `https://www.hmv.co.jp/search/category_24/keyword_${encodeURIComponent(query)}/`,
      id: "4cbbpSXu6f9syT325SOXl",
    },

    /** https://www.amazon.co.jp/s?k={クエリ}&rh=n%3A465392&dc */
    amazon: {
      label: "Amazon",
      urlConstructor: (query: string) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&rh=n%3A465392&dc`,
      id: "W-ugfbS_SqlbjOQXngamF",
    },
  },
  eBook: {
    /** `https://honto.jp/ebook/search_10{クエリ}.html` */
    honto: {
      label: "honto",
      urlConstructor: (query: string) => `https://honto.jp/ebook/search_10${encodeURIComponent(query)}.html`,
      id: "U1ZSXeSFHzzBDl-HKttaT",
    },

    /** `https://www.kinokuniya.co.jp/kinoppystore/search.php?keyword={クエリ}` */
    kinoppy: {
      label: "紀伊國屋書店Kinoppy",
      urlConstructor: (query: string) => `https://www.kinokuniya.co.jp/kinoppystore/search.php?keyword=${encodeURIComponent(query)}`,
      id: "gxN44Rnzu9Hd3kpqDbZ_D",
    },

    /** `https://bookwalker.jp/search/?word={クエリ}` */
    bookWalker: {
      label: "BOOK☆WALKER",
      urlConstructor: (query: string) => `https://bookwalker.jp/search/?word=${encodeURIComponent(query)}`,
      id: "LQ3V4n66e581FzvxFPqpn",
    },

    /** `https://books.rakuten.co.jp/search?sitem={クエリ}&g=101` */
    rakuten: {
      label: "楽天Kobo",
      urlConstructor: (query: string) => `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(query)}&g=101`,
      id: "t5mgi4qySJx-n-GcnKfqR",
    },

    /** `https://book.dmm.com/search/?searchstr={クエリ}` */
    dmm: {
      label: "DMMブックス",
      urlConstructor: (query: string) => `https://book.dmm.com/search/?searchstr=${encodeURIComponent(query)}`,
      id: "Qw7MgSMwH7PfW1Nh7LSEU",
    },

    /** `https://www.yodobashi.com/category/151007/?word={クエリ}` */
    yodobashi: {
      label: "ヨドバシ (Doly)",
      urlConstructor: (query: string) => `https://www.yodobashi.com/category/151007/?word=${encodeURIComponent(query)}`,
      id: "FSzzKfTTXlEypC0RAZ8F8",
    },

    /** `https://booklive.jp/search/keyword?keyword={クエリ}` */
    bookLive: {
      label: "ブックライブ",
      urlConstructor: (query: string) => `https://booklive.jp/search/keyword?keyword=${encodeURIComponent(query)}`,
      id: "bzEti6Bwb8eFZbruSnSd9",
    },

    /** `https://www.amazon.co.jp/s?k={クエリ}&rh=p_n_binding_browse-bin%3A2450763051` */
    kindle: {
      label: "Kindle (Amazon)",
      // dc: アマゾンくんのとても賢いAIさんが検索クエリを勝手に変えないようにする
      urlConstructor: (query: string) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&rh=p_n_binding_browse-bin%3A2450763051&dc`,
      id: "uQlPY3sl-5h-_DasLzBbZ",
    },

    /** `https://ebookjapan.yahoo.co.jp/search/?keyword={クエリ}` */
    ebookJapan: {
      label: "ebookjapan",
      urlConstructor: (query: string) => `https://ebookjapan.yahoo.co.jp/search/?keyword=${encodeURIComponent(query)}`,
      id: "7dOSZfvh-9ZpV9YKh1wIc",
    },

    /** `https://dbook.docomo.ne.jp/search/?q={クエリ}` */
    dBook: {
      label: "dブック (docomo)",
      urlConstructor: (query: string) => `https://dbook.docomo.ne.jp/search/?q=${encodeURIComponent(query)}`,
      id: "SlIp0RqtFaKWrWcIHXKoV",
    },

    /** `https://www.cmoa.jp/search/result/?word={クエリ}` */
    cmoa: {
      label: "コミックシーモア",
      urlConstructor: (query: string) => `https://www.cmoa.jp/search/result/?word=${encodeURIComponent(query)}`,
      id: "TLGWFAufXUuxgnqEOvLHU",
    },

    /** https://dokusho-ojikan.jp/search/result/1?q={クエリ} */
    amebaManga: {
      label: "Amebaマンガ",
      urlConstructor: (query: string) => `https://dokusho-ojikan.jp/search/result/1?q=${encodeURIComponent(query)}`,
      id: "-uvm5OESbcIkP1Fm-w7k9",
    },

    /** https://ebookstore.sony.jp/search/?q={クエリ}&cs=search_keyword */
    readerStore: {
      label: "Reader Store (Sony)",
      urlConstructor: (query: string) => `https://ebookstore.sony.jp/search/?q=${encodeURIComponent(query)}&cs=search_keyword`,
      id: "K5EoGMRsa68E2IpEVfDkW",
    },

    /** https://galapagosstore.com/web/book/search/result?sw={クエリ}&res=false */
    cocoroBooks: {
      label: "COCORO BOOKS (SHARP)",
      urlConstructor: (query: string) => `https://galapagosstore.com/web/book/search/result?sw=${encodeURIComponent(query)}&res=false`,
      id: "xQYFkv83MwulD4Lj3fjuL",
    },

    /** https://bookpass.auone.jp/search?query={クエリ} */
    auBookPass: {
      label: "auブックパス",
      urlConstructor: (query: string) => `https://bookpass.auone.jp/search?query=${encodeURIComponent(query)}`,
      id: "Av2IEKYWsCwSGy_pYTZjA",
    },

    /** `https://video.unext.jp/freeword/book?query={クエリ}` */
    unext: {
      label: "U-NEXT",
      urlConstructor: (query: string) => `https://video.unext.jp/freeword/book?query=${encodeURIComponent(query)}`,
      id: "k3wyXmN0b5GkkNvYGroUM",
    },

    /** https://play.google.com/store/search?q={クエリ}&c=books */
    googlePlayBooks: {
      label: "Google Play",
      urlConstructor: (query: string) => `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=books`,
      id: "LiMJSvRo9bE4ucidqwUbH",
    },
  },
  realStore: {
    /** https://www.maruzenjunkudo.co.jp/search?item_name=&q={クエリ} */
    maruzenJunkudo: {
      label: "丸善ジュンク堂",
      urlConstructor: (query: string) => `https://www.maruzenjunkudo.co.jp/search?item_name=&q=${encodeURIComponent(query)}`,
      note: "検索結果で商品を選択し、「My店舗在庫」か「店舗在庫」に進んでください",
      id: "o7gFUmtGgqVPpmE_rsUOu",
    },

    /** https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp?qs=true&ptk=01&q={クエリ} */
    kinokuniya: {
      label: "紀伊國屋書店",
      urlConstructor: (query: string) => `https://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp?qs=true&ptk=01&q=${encodeURIComponent(query)}`,
      note: "検索結果で商品を選択し、「店の在庫を確認・取置」に進んでください",
      id: "jGSaukTyLj-xotYEyufkx",
    },

    /** https://www.search.kumabook.com/kumazawa/html/products/list?name={クエリ} */
    kumazawa: {
      label: "くまざわ書店",
      urlConstructor: (query: string) => `https://www.search.kumabook.com/kumazawa/html/products/list?name=${encodeURIComponent(query)}`,
      id: "iX2QQ5bm_IQBj0UrNNS-r",
    },

    /** https://www.books-sanseido.jp/booksearch/BookSearchExec.action?keyword={クエリ}&shopCode=&defaultShopCode=&title=&author=&isbn=&genreCode= */
    booksSanseido: {
      label: "三省堂書店",
      urlConstructor: (query: string) => `https://www.books-sanseido.jp/booksearch/BookSearchExec.action?keyword=${encodeURIComponent(query)}&shopCode=&defaultShopCode=&title=&author=&isbn=&genreCode=`,
      id: "oiR_B3t7jQLanHlEhaG3y",
    },

    /** https://www.shoten.co.jp/rel/searchbook/result.asp?title={クエリ} */
    shoten: {
      label: "コーチャンフォー",
      urlConstructor: (query: string) => `https://www.shoten.co.jp/rel/searchbook/result.asp?title=${encodeURIComponent(query)}`,
      id: "bFR0Ro1bTm8u9dhj0H2N6",
    },

    /** https://search.yurindo.bscentral.jp/result?kw={クエリ} */
    yurindo: {
      label: "有隣堂",
      urlConstructor: (query: string) => `https://search.yurindo.bscentral.jp/result?kw=${encodeURIComponent(query)}`,
      id: "906lofGrvPDqqFXDOhjvk",
    },

    /** https://search.miraiyashoten.co.jp/books/?search_txt={クエリ} */
    miraiyashoten: {
      label: "未来屋書店",
      urlConstructor: (query: string) => `https://search.miraiyashoten.co.jp/books/?search_txt=${encodeURIComponent(query)}`,
      id: "5DWVIgU3B9J6VFZSwHwjQ",
    },

    /** https://store-tsutaya.tsite.jp/search/result/?keyword={クエリ}&itemType=book */
    tsutaya: {
      label: "TSUTAYA",
      urlConstructor: (query: string) => `https://store-tsutaya.tsite.jp/search/result/?keyword=${encodeURIComponent(query)}&itemType=book`,
      note: "検索結果で商品を選択し、在庫確認に進んでください",
      id: "iqNOrqB0EASdzcFKRUmwh",
    },
  },
  comicSpecialtyStore: {

    /** https://www.melonbooks.co.jp/search/search.php?mode=search&name={クエリ} */
    melonbooks: {
      label: "メロンブックス",
      urlConstructor: (query: string) => `https://www.melonbooks.co.jp/search/search.php?mode=search&name=${encodeURIComponent(query)}`,
      id: "_zN9UIlMxZXbBn2A1TxmU",
    },

    /** https://www.animate-onlineshop.jp/products/list.php?mode=search&smt={クエリ} */
    animate: {
      label: "アニメイト",
      urlConstructor: (query: string) => `https://www.animate-onlineshop.jp/products/list.php?mode=search&smt=${encodeURIComponent(query)}`,
      id: "MUlXcXWvEF0RS-94pM880",
    },

    /** https://www.gamers.co.jp/products/list.php?mode=search&smt={クエリ} */
    gamers: {
      label: "ゲーマーズ",
      urlConstructor: (query: string) => `https://www.gamers.co.jp/products/list.php?mode=search&smt=${encodeURIComponent(query)}`,
      id: "9JT038FvQsIUWmuZvVBMG",
    },
  },
  used: {

    /** https://shopping.bookoff.co.jp/search/keyword/{クエリ} */
    bookoff: {
      label: "ブックオフ",
      urlConstructor: (query: string) => `https://shopping.bookoff.co.jp/search/keyword/${encodeURIComponent(query)}`,
      id: "NAsICriVLcq7JSZXZElfj",
    },

    /** https://www.netoff.co.jp/cmdtyallsearch/?cat=&cname=%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA%E3%83%BC&word={クエリ} */
    netoff: {
      label: "ネットオフ",
      urlConstructor: (query: string) => `https://www.netoff.co.jp/cmdtyallsearch/?cat=&cname=%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA%E3%83%BC&word=${encodeURIComponent(query)}`,
      id: "MF-MRU5bxgZDmKYrVBvmN",
    },

    /** https://www.kosho.or.jp/products/list.php?search_word={クエリ}&mode=search */
    kosho: {
      label: "日本の古本屋 (全国古書籍商組合連合会)",
      urlConstructor: (query: string) => `https://www.kosho.or.jp/products/list.php?search_word=${encodeURIComponent(query)}&mode=search`,
      id: "1aCw65SXaw6wA0f9p0ZND",
    },
  },
  bibliography: {

    /** https://www.hanmoto.com/bd/search/top?keyword={クエリ} */
    hanmoto: {
      label: "版元ドットコム",
      urlConstructor: (query: string) => `https://www.hanmoto.com/bd/search/top?keyword=${encodeURIComponent(query)}`,
      id: "_H-wg1Hc46r2qsiAiAxXS",
    },

    /** https://ndlsearch.ndl.go.jp/bib?cs=marc&keyword={クエリ} */
    ndl: {
      label: "国立国会図書館サーチ",
      urlConstructor: (query: string) => `https://ndlsearch.ndl.go.jp/bib?cs=marc&keyword=${encodeURIComponent(query)}`,
      id: "ctSHthzX9GF2aNjOr9MiQ",
    },
  },
  library: {

    /** https://calil.jp/search?q={クエリ} */
    calil: {
      label: "カーリル 日本最大の図書館検索",
      urlConstructor: (query: string) => `https://calil.jp/search?q=${encodeURIComponent(query)}`,
      id: "yd4cOSrK7WY_CQhQxzh7h",
    },

    /** https://ndlsearch.ndl.go.jp/bib?cs=marc&keyword={クエリ} */
    ndl: {
      label: "国立国会図書館サーチ",
      urlConstructor: (query: string) => `https://ndlsearch.ndl.go.jp/bib?cs=marc&keyword=${encodeURIComponent(query)}#library`,
      id: "n6TtvpLlESpwtbRshBJg8",
      note: "検索結果で本を選択し、「所蔵している図書館を見る」から「全国の図書館の所蔵」を確認してください",
    },
  }
};
