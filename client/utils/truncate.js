export function truncateAlt(str) {
    if (str.length > 20) {
      return str.slice(0, 20);
    } else {
      return str;
    }
  }

  export function truncateTitle(str) {
    if (str.length > 80) {
      return str.slice(0, 80) + "...";
    } else {
      return str;
    }
  }

  export function truncateMeta(str) {
    if (str.length > 250) {
      return str.slice(0, 250) + "...";
    } else {
      return str;
    }
  }


