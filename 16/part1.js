const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')

const hex2bin = hex => hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('')

const bin2package = bin => {
  const package = {
    version: parseInt(bin.slice(0, 3), 2),
    typeId: parseInt(bin.slice(3, 6), 2)
  }

  if (package.typeId == 4) {
    let i = 6
    let val = ''
    while (true) {
      const next = bin.slice(i, i+5)
      val += next.slice(1)
      i += 5
      if (next[0] == '0') break
    }
    package.value = parseInt(val, 2)
    package.length = i
  } else {
    package.lengthTypeId = +bin[6]    
    if (package.lengthTypeId == 0) {
      package.subPackageLength = parseInt(bin.slice(7, 22), 2)
      package.length = 22 + package.subPackageLength
      package.subPackages = []
      while (true) {
        const l = package.subPackages.reduce((sum, sp) => sum + sp.length, 0)
        if (l == package.subPackageLength) break
        package.subPackages.push(bin2package(bin.slice(22 + l)))
      }
    }
    if (package.lengthTypeId == 1) {
      package.subPackageNumber = parseInt(bin.slice(7, 18), 2)
      package.length = 18
      package.subPackages = []
      while (package.subPackages.length < package.subPackageNumber) {
        const next = bin2package(bin.slice(package.length))
        package.subPackages.push(next)
        package.length += next.length
      }
    }
  }

  return package
}

const hex2package = hex => bin2package(hex2bin(hex))

const packageSum = p => {
  let subPackageLength = 0
  if (p.subPackages && p.subPackages.length > 0) subPackageLength = p.subPackages.reduce((s, p) => s + packageSum(p), 0)
  return p.version + subPackageLength
}

const package = hex2package(input)
console.log(packageSum(package))
