const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "src");

const blacklist = [
  "node_modules",
  "uploads",
  "scripts",
  "index.js",
  "server.js",
  "temp"
];

function buildIndex(dirPath) {
  const items = fs.readdirSync(dirPath);
  const exports = [];

  for (const item of items) {
    if (item.startsWith(".") || blacklist.includes(item)) {
      continue;
    }

    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const hasIndex = buildIndex(fullPath);

      if (hasIndex) {
        exports.push(`...require("./${item}")`);
      }
    } else if (stat.isFile() && /\.js$/.test(item)) {
      const name = path.parse(item).name;
      exports.push(`...require("./${name}")`);
    }
  }

  if (!exports.length) {
    return false;
  }

  const content = `module.exports = {\n${exports
    .map((item) => `  ${item},`)
    .join("\n")}\n};\n`;

  fs.writeFileSync(
    path.join(dirPath, "index.js"),
    content,
    "utf8"
  );

  console.log(
    `Đã tạo index.js: ${path.relative(targetDir, dirPath) || "src"}`
  );

  return true;
}

if (!fs.existsSync(targetDir)) {
  console.error("Không tìm thấy thư mục src.");
  process.exit(1);
}

console.log("Bắt đầu tạo index.js...");
buildIndex(targetDir);
console.log("Hoàn thành.");