import { LinkStatus } from "./types";

export const status = {
  LIVE: <LinkStatus>{
    text: "LIVE",
    color: "failure",
  },
  SOON: <LinkStatus>{
    text: "SOON",
    color: "warning",
  },
  NEW: <LinkStatus>{
    text: "NEW",
    color: "success",
  },
};

export const links = [
  {
    label: "Home",
    icon: "HomeIcon",
    href: "/",
  },
  {
    label: "Trade",
    icon: "TradeIcon",
    items: [
      {
        label: "Exchange",
        href: "https://exchange.neondex.finance",
      },
      {
        label: "Liquidity",
        href: "https://exchange.neondex.finance/#/pool",
      },
    ],
  },
  {
    label: "Farms",
    icon: "FarmIcon",
    href: "/farms",
    status: status.LIVE,
  },
  {
    label: "Pools",
    icon: "PoolIcon",
    href: "/syrup",
  },
  {
    label: "Lottery",
    icon: "TicketIcon",
    href: "/lottery",
  },
  {
    label: "NFT",
    icon: "NftIcon",
    href: "/nft",
  },
  {
    label: "Team Battle",
    icon: "TeamBattleIcon",
    href: "/competition",
    status: status.SOON,
  },
  {
    label: "Profile & Teams",
    icon: "GroupsIcon",
    status: status.LIVE,
    items: [
      {
        label: "Leaderboard",
        href: "/teams",
        status: status.NEW,
      },
      {
        label: "YourProfile",
        href: "/",
      },
    ],
    calloutClass: "rainbow",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    items: [
      {
        label: "Overview",
        href: "https://neondex.info",
      },
      {
        label: "Tokens",
        href: "https://neondex.info/tokens",
      },
      {
        label: "Pairs",
        href: "https://neondex.info/pairs",
      },
      {
        label: "Accounts",
        href: "https://neondex.info/accounts",
      },
    ],
  },
  {
    label: "IFO",
    icon: "IfoIcon",
    items: [
      {
        label: "Next",
        href: "/ifo",
      },
      {
        label: "History",
        href: "/ifo/history",
      },
    ],
  },
  {
    label: "More",
    icon: "MoreIcon",
    items: [
      {
        label: "Voting",
        href: "https://voting.neondex.finance",
      },
      {
        label: "Github",
        href: "https://github.com/neondex",
      },
      {
        label: "Docs",
        href: "https://docs.neondex.finance",
      },
      {
        label: "Blog",
        href: "https://neondex.medium.com",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: "TelegramIcon",
    items: [
      {
        label: "English",
        href: "https://t.me/neondex",
      },
      // {
      //   label: "Bahasa Indonesia",
      //   href: "https://t.me/neondexIndonesia",
      // },
      // {
      //   label: "中文",
      //   href: "https://t.me/neondex_CN",
      // },
      // {
      //   label: "Tiếng Việt",
      //   href: "https://t.me/neondexVN",
      // },
      // {
      //   label: "Italiano",
      //   href: "https://t.me/neondex_ita",
      // },
      // {
      //   label: "русский",
      //   href: "https://t.me/neondex_ru",
      // },
      // {
      //   label: "Türkiye",
      //   href: "https://t.me/neondexturkiye",
      // },
      // {
      //   label: "Português",
      //   href: "https://t.me/neondexPortuguese",
      // },
      // {
      //   label: "Español",
      //   href: "https://t.me/neondexEs",
      // },
      // {
      //   label: "日本語",
      //   href: "https://t.me/neondexjp",
      // },
      // {
      //   label: "Français",
      //   href: "https://t.me/neondexfr",
      // },
      // {
      //   label: "Announcements",
      //   href: "https://t.me/neondexAnn",
      // },
      // {
      //   label: "Whale Alert",
      //   href: "https://t.me/neondexWhales",
      // },
    ],
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/neondex",
  },
];

export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 0;
