const fs = require("fs");
const sharp = require("sharp");

const username = "kyguy";
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("Missing GITHUB_TOKEN");
  process.exit(1);
}

async function getContributions() {
  const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    process.exit(1);
  }

  return json.data.user.contributionsCollection
    .contributionCalendar.weeks
    .flatMap(w => w.contributionDays);
}


function colorForCount(count) {
  if (count === 0) return "#161b22";
  if (count < 2) return "#0e4429";
  if (count < 5) return "#006d32";
  if (count < 10) return "#26a641";
  return "#39d353";
}


function generateSVG(days) {

  const cellSize = 12;
  const gap = 4;

  const labelWidth = 35;
  const labelHeight = 25;

  const columns = Math.ceil(days.length / 7);

  const gridWidth =
    columns * (cellSize + gap);

  const gridHeight =
    7 * (cellSize + gap);


  const width = 950;
  const height = 160;


  const offsetX =
    labelWidth +
    Math.floor((width - labelWidth - gridWidth) / 2);

  const offsetY =
    labelHeight +
    Math.floor((height - labelHeight - gridHeight) / 2);


  let svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}">

<style>
text {
  font-family: Arial, sans-serif;
}
rect {
  rx: 3;
}
</style>
`;


  //
  // Weekday labels
  //
  const weekdays = [
    { name: "Mon", row: 1 },
    { name: "Wed", row: 3 },
    { name: "Fri", row: 5 }
  ];


  weekdays.forEach(day => {
    svg += `
<text
 x="0"
 y="${offsetY + day.row * (cellSize + gap) + 10}"
 fill="#8b949e"
 font-size="10">
 ${day.name}
</text>`;
  });



  //
  // Month labels
  //
  let lastMonth = "";

  days.forEach((day, index) => {

    const date = new Date(day.date);

    const month =
      date.toLocaleString("en-US", {
        month: "short"
      });


    const week =
      Math.floor(index / 7);


    if (
      month !== lastMonth &&
      index % 7 === 0
    ) {

      svg += `
<text
 x="${offsetX + week * (cellSize + gap)}"
 y="15"
 fill="#8b949e"
 font-size="10">
 ${month}
</text>`;

      lastMonth = month;
    }

  });



  //
  // Contribution squares
  //
  days.forEach((day, index) => {

    const week =
      Math.floor(index / 7);

    const weekday =
      index % 7;


    const x =
      offsetX +
      week * (cellSize + gap);

    const y =
      offsetY +
      weekday * (cellSize + gap);


    svg += `
<rect
 x="${x}"
 y="${y}"
 width="${cellSize}"
 height="${cellSize}"
 fill="${colorForCount(day.contributionCount)}">

<title>
${day.date}: ${day.contributionCount} contributions
</title>

</rect>
`;
  });



  //
  // Legend
  //
  const legend = [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353"
  ];


  legend.forEach((color, i) => {

    svg += `
<rect
 x="${width - 120 + i * 18}"
 y="${height - 20}"
 width="12"
 height="12"
 fill="${color}"/>
`;
  });


  svg += `
</svg>
`;

  return svg;
}



async function main() {

  console.log("Fetching GitHub contributions...");

  const days = await getContributions();

  console.log(
    `Received ${days.length} days`
  );
 
  const svg =
    generateSVG(days);


  fs.mkdirSync("assets", {
    recursive: true
  });


  fs.writeFileSync(
    "assets/heatmap.svg",
    svg
  );

  console.log(
    "Created assets/heatmap.svg"
  );
  
  // Create PNG copy for LinkedIn/social previews
  sharp(Buffer.from(svg))
    .png()
    .toFile("assets/heatmap.png")
    .then(() => {
      console.log("Created assets/heatmap.png");
    })
    .catch((err) => {
      console.error("PNG generation failed:", err);
      process.exit(1);
    });
}


main();
