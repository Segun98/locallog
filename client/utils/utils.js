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
export function truncateSearch(str) {
  if (str.length > 60) {
    return str.slice(0, 60) + "...";
  } else {
    return str;
  }
}

export function dash(str) {
  const trimmed = str.trim();
  const dashed = trimmed.split(" ").join("-");
  return dashed.toLowerCase()
}

export const endpoint = "https://backlog.now.sh/graphql"
// "http://localhost:8080/graphql"
// "https://backlog.now.sh/graphql"
// "https://locallog.herokuapp.com/graphql"