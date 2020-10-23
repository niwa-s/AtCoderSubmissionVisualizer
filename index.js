async function main() {
  try {
    const userId = getUserId();
    const userInfo = fetchUserInfo(userId);
    let hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    await getSubmitInfo(userInfo, hours);
    console.log(hours);
    const view = createView(hours);
    //console.log(view);
    //console.log(hours);
    if(userId) displayView(view, userId);
  } catch(error) {
    console.error(`エラーが発生しました(${error})`);
  }
}

function createView(hours) {
  return escapeHTML`
  <ul>
    <li>0時: ${hours[0]}</li>
    <li>1時: ${hours[1]}</li>
    <li>2時: ${hours[2]}</li>
    <li>3時: ${hours[3]}</li>
    <li>4時: ${hours[4]}</li>
    <li>5時: ${hours[5]}</li>
    <li>6時: ${hours[6]}</li>
    <li>7時: ${hours[7]}</li>
    <li>8時: ${hours[8]}</li>
    <li>9時: ${hours[9]}</li>
    <li>10時: ${hours[10]}</li>
    <li>11時: ${hours[11]}</li>
    <li>12時: ${hours[12]}</li>
    <li>13時: ${hours[13]}</li>
    <li>14時: ${hours[14]}</li>
    <li>15時: ${hours[15]}</li>
    <li>16時: ${hours[16]}</li>
    <li>17時: ${hours[17]}</li>
    <li>18時: ${hours[18]}</li>
    <li>19時: ${hours[19]}</li>
    <li>20時: ${hours[20]}</li>
    <li>21時: ${hours[21]}</li>
    <li>22時: ${hours[22]}</li>
    <li>23時: ${hours[23]}</li>
  </ul>
  `;
}

function displayView(view, userId) {
  const userName = document.getElementById("handle_atcoder");
  userName.value = userId;
  const result = document.getElementById("graph");
  result.innerHTML = view;
}

function getUserId() {
  const url = location.search.slice(1);
  const query = url.split("=");
  return query[1];
}

function fetchUserInfo(userId) {
  return fetch(`https://kenkoooo.com/atcoder/atcoder-api/results?user=${encodeURIComponent(userId)}`)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      } else {
        return response.json();
      }
    });
}



async function getSubmitInfo(userInfo, hours) {
  await userInfo.then(data => {
    for(let i in data) {
      //console.log(data[i].epoch_second);
      let submitTime = data[i].epoch_second;
      submitTime = new Date(submitTime * 1000);
      submitTime = submitTime.toString();
      submitTime = submitTime.split(" ");
      submitTime = parseInt(submitTime[4].slice(0, 2), 10);
      hours[submitTime]++;
    }
    let submitSum = 0;
    for(let i in hours) {
      //console.log(i + " " + hours[i]);
      submitSum += hours[i];
    }
    console.log("submitSum = " + submitSum);
    //console.log(hours);
  }).catch((error) => {
    console.log("エラーが発生しました");
  });
}
function escapeSpecialChars(str) {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
      const value = values[i - 1];
      if (typeof value === "string") {
          return result + escapeSpecialChars(value) + str;
      } else {
          return result + String(value) + str;
      }
  });
}
main();