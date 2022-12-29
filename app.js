const Node = (value) => {
  return { value, left: null, right: null };
};

const Tree = (arr) => {
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = Node(arr[mid]);
    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);
    return root;
  };
  arr = arr.filter((value, index) => arr.indexOf(value) === index);
  arr.sort((a, b) => a - b);

  let root = buildTree(arr);

  const insert = (value, node = root) => {
    if (find(value, node)) return;
    const side = value < node.value ? "left" : "right";
    if (node[side]) insert(value, node[side]);
    else node[side] = Node(value);
  };
  const remove = (value) => {
    const findParent = (value, node = root) => {
      if (!node) return [null, null];
      if (node.left?.value === value) return [node, "left"];
      if (node.right?.value === value) return [node, "right"];
      return value < node.value
        ? findParent(value, node.left)
        : findParent(value, node.right);
    };

    const [parent, side] = findParent(value);
    if (!parent && value !== root.value) return;
    const node = parent ? parent[side] : root;
    if (!node.left && !node.right) {
      if (parent) parent[side] = null;
      else root = null;
    } else if (!node.left) {
      if (parent) parent[side] = node.right;
      else root = node.right;
    } else if (!node.right) {
      if (parent) parent[side] = node.left;
      else root = node.left;
    } else {
      let smallest = null;
      inorder((child) => {
        if (!smallest) smallest = child;
      }, node.right);
      let [smallestParent, smallestParentSide] = findParent(
        smallest.value,
        node
      );
      smallestParent[smallestParentSide] = smallest.right;
      smallest.left = node.left;
      smallest.right = node.right;
      if (parent) parent[side] = smallest;
      else root = smallest;
    }
  };
  const find = (value, node = root) => {
    if (!node || node.value === value) return node;
    return value < node.value
      ? find(value, node.left)
      : find(value, node.right);
  };
  const levelOrder = (callback) => {
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  };
  const inorder = (callback, node = root) => {
    if (!node) return;
    inorder(callback, node.left);
    callback(node);
    inorder(callback, node.right);
  };
  const preorder = (callback, node = root) => {
    if (!node) return;
    callback(node);
    preorder(callback, node.left);
    preorder(callback, node.right);
  };
  const postorder = (callback, node = root) => {
    if (!node) return;
    postorder(callback, node.left);
    postorder(callback, node.right);
    callback(node);
  };
  const height = (node = root) => {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
  };
  const depth = (node, current = root) => {
    if (!current) return null;
    if (current.value === node.value) return 0;
    const found =
      node.value < current.value
        ? depth(node, current.left)
        : depth(node, current.right);
    if (found === null)
      throw `ElementNotFoundException - Couldn't find Node with value ${node.value}`;
    return 1 + found;
  };
  const isBalanced = (node = root) => {
    if (!node) return true;
    if (Math.abs(height(node.left) - height(node.right)) > 1) return false;
    return isBalanced(node.left) && isBalanced(node.right);
  };
  const rebalance = () => {
    const arr = [];
    inorder((node) => arr.push(node.value));
    root = buildTree(arr);
  };
  const getRoot = () => {
    return root;
  };

  return {
    insert,
    remove,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    getRoot,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = Tree([1, 7, 4, 8, 9, 4, 3, 5, 7, 9, 6345, 324]);
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
console.log("---");
tree.levelOrder((node) => console.log(node.value));
console.log("---");
tree.preorder((node) => console.log(node.value));
console.log("---");
tree.postorder((node) => console.log(node.value));
console.log("---");
tree.inorder((node) => console.log(node.value));
tree.insert(200);
tree.insert(214);
tree.insert(333);
tree.insert(165);
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
tree.rebalance();
tree.insert(201);
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
console.log("---");
tree.levelOrder((node) => console.log(node.value));
console.log("---");
tree.preorder((node) => console.log(node.value));
console.log("---");
tree.postorder((node) => console.log(node.value));
console.log("---");
tree.inorder((node) => console.log(node.value));
prettyPrint(tree.getRoot());
