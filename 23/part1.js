const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const types = Object.freeze({
    A: Symbol('A'),
    B: Symbol('B'),
    C: Symbol('C'),
    D: Symbol('D'),
    N: Symbol('.')
})

const roomTypes = [types.A,types.B,types.C,types.D]
const tileTypes = [types.A,types.B,types.C,types.D,types.N]

const hwMoveCost = [
    [ 3, 2, 2, 4, 6, 8, 9 ],
    [ 5, 4, 2, 2, 4, 6, 7 ],
    [ 7, 6, 4, 2, 2, 4, 5 ],
    [ 9, 8, 6, 4, 2, 2, 3 ],
]

class State {
  hallway = new Array(7).fill(types.N)
  rooms = new Array(4).fill(new Array(2).fill(types.N))

  constructor(rooms = undefined, hallway = undefined) {
    if(rooms) this.rooms = rooms
    if(hallway) this.hallway = hallway
  }

  clone() {
    return new State(this.rooms.map(r => r.slice(0)), this.hallway.slice(0))
  }
}

const isSolved = s => s.hallway.every(s => s == types.N) && s.rooms.every((r, i) => r.every(p => p == roomTypes[i]))

const canMoveToRoom = (s, roomNo, hwPos) => {
  const res = s.hallway.slice(2+ +roomNo, hwPos).every(t => t == types.N)
  && s.hallway.slice(1+ +hwPos, 2+ +roomNo).every(t => t == types.N)

  return res
}

const hallwayZ = [
  708786791201498, 317332307342288, 683099304588431,
  560304694145934, 399245057071795, 465318872759979,
  221320290823693, 200660286895173, 124659309221239,
  552329615607474, 554350390749193, 984037754776103,
  880195092097450, 950459231587646, 952640161800530,
  102026951817622, 673602971042807, 218412101979642,
  664726995723215, 711893578985282,  44905554233567,
  677109129768943,  70046272025524, 333510030921820,
  169001273719773, 290017867515192, 972391080845406,
  304061173939160, 557179001908467, 628137634937010,
  398256575504740, 657531193184809, 892264147196050,
  165816473909774, 251344150983516
]
const roomsZ =  [
  825899060456812, 785169515411579, 681757534347326, 784877143529124,
     667619638875, 252773944499231, 832653472998435, 686475304016530,
  213520323969352, 512086522790542, 768215112898777, 729172705255285,
  369439140226166, 474436117940573, 561126787333988, 774795077992445,
  618163924549892, 713991633934810, 991480688168646, 129955698905924,
  891053702931666, 416283093293226, 539921881961237, 807393453129318,
  997402040223472, 771981591483197, 733439386457766, 728444190741956,
  466549213434025, 285420956100402, 911110620596512, 945244946437129,
  280665084306291, 855861595475046, 163597310489147, 145652871436634,
  299092203482886, 845347010385599, 720402380724237, 157629642807886,
  472016204556702, 418599394916067, 233491201057888, 295587671580125,
   82086848761111,  81143771498312, 928042641059174, 989682557080071,
  929561375277149, 340544495501554, 446913455007017,  18906132118202,
   93920163208155,  96105219924502, 834168771800997, 399089773761419,
  712884309631400, 972115893167647,  42862566352011, 844147463445392,
  645806129877907,  56870037585602, 629964595008558, 610345626231032,
  321402819172452, 738376458903838, 331356612767131, 832322268176672,
  976553615298948,  72880773929218, 786491529086201, 281814644045417,
  712057258576590,   1518010189838, 641422876211497, 242339325309451,
  687569757096570, 593949328177063, 285750553563762, 550752445046944
]

const hash = s => s.rooms.reduce((h, r, i) => r.reduce((h2,c,j) => {
    return h2 ^ roomsZ[tileTypes.indexOf(c)*16+i*4+j]
  },h), s.hallway.reduce((h, c2, i) => {
    return h ^ hallwayZ[tileTypes.indexOf(c2)*7+i]
  }, 420247))

const top=0,parent=c=>(c+1>>>1)-1,left=c=>(c<<1)+1,right=c=>c+1<<1;class PriorityQueue{constructor(c=(d,e)=>d>e){this._heap=[],this._comparator=c}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...c){return c.forEach(d=>{this._heap.push(d),this._siftUp()}),this.size()}pop(){const c=this.peek(),d=this.size()-1;return d>top&&this._swap(top,d),this._heap.pop(),this._siftDown(),c}replace(c){const d=this.peek();return this._heap[top]=c,this._siftDown(),d}_greater(c,d){return this._comparator(this._heap[c],this._heap[d])}_swap(c,d){[this._heap[c],this._heap[d]]=[this._heap[d],this._heap[c]]}_siftUp(){for(let c=this.size()-1;c>top&&this._greater(c,parent(c));)this._swap(c,parent(c)),c=parent(c)}_siftDown(){for(let d,c=top;left(c)<this.size()&&this._greater(left(c),c)||right(c)<this.size()&&this._greater(right(c),c);)d=right(c)<this.size()&&this._greater(right(c),left(c))?right(c):left(c),this._swap(c,d),c=d}}

const rooms = [
  [types[input[3][3]],types[input[2][3]]],
  [types[input[3][5]],types[input[2][5]]],
  [types[input[3][7]],types[input[2][7]]],
  [types[input[3][9]],types[input[2][9]]]
]

const leastCost = s => {
  const costs = new Map()

  costs.set(hash(s), 0)

  const q = new PriorityQueue((a,b) => a[0]<b[0])
  q.push([0, s, hash(s)])

  while (!q.isEmpty()) {
    let [cost, oldState, h] = q.pop()
    if (isSolved(oldState)) {
      return cost
    }
    if (cost > (costs.has(h) ? costs.get(h) : Infinity)) continue

    for (let iH in oldState.hallway) {
      const val = oldState.hallway[iH]
      if (val == types.N) continue
      const dest = roomTypes.indexOf(val)
      if (!canMoveToRoom(oldState, dest, iH)) continue
      for (let iR in oldState.rooms[dest]) {
        const roomVal = oldState.rooms[dest][iR]
        if (roomVal == val) continue
        if (roomVal == types.N) {
          let state = oldState.clone()
          state.rooms[dest][iR] = val
          state.hallway[iH] = types.N
          const dist = hwMoveCost[dest][iH] + state.rooms[dest].length-1-iR
          const tI = roomTypes.indexOf(val)
          newCost = cost + dist * 10 ** tI
          const newHash = h ^ roomsZ[16*tI+dest*4+ +iR] ^ roomsZ[64+dest*4+ +iR] ^ hallwayZ[28+ +iH] ^ hallwayZ[tI*7+ +iH]
          if (!costs.has(newHash) || costs.get(newHash) > newCost) {
            costs.set(newHash, newCost)
            q.push([newCost, state, newHash])
          }
        }
        break
      }
    }

    for (let iR in oldState.rooms) {
      const slot = oldState.rooms[iR]
      let found = false
      for (let val of slot) {
        if (val !== types.N && roomTypes.indexOf(val) !== iR) {
          found = true
          break
        }
      }
      if (!found) continue
      for (let i = 0; i<slot.length;i++) {
        const slotIdx = slot.length - i - 1
        const val = slot[slotIdx]
        if (val == types.N) continue
        for (let hwIdx in oldState.hallway) {
          const c = oldState.hallway[hwIdx]
          if (c != types.N || !canMoveToRoom(oldState, iR, hwIdx)) continue
          const dist = hwMoveCost[iR][hwIdx] + i
          let state = oldState.clone()
          state.hallway[hwIdx] = val
          state.rooms[iR][slotIdx] = types.N
          const tI = roomTypes.indexOf(val)
          newCost = cost + dist * 10 ** tI
          const newHash = h ^ roomsZ[16*tI+iR*4+slotIdx] ^ roomsZ[64+iR*4+slotIdx] ^ hallwayZ[28+ +hwIdx] ^ hallwayZ[tI*7+ +hwIdx]  
          if (!costs.has(newHash) || costs.get(newHash) > newCost) {
            costs.set(newHash, newCost)
            q.push([newCost, state, newHash])
          }
        }
        break
      }
    }
  }
}

const initialState = new State(rooms)

const res = leastCost(initialState)

console.log(res)