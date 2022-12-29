const Node = (value) => {
  return { value, left: null, right: null };
};

const Tree = (arr) => {
  const buildTree = (arr) => {};

  const insert = (value) => {};
  const remove = (value) => {};
  const find = (value) => {};
  const levelOrder = (callback) => {};
  const inorder = (callback) => {};
  const preorder = (callback) => {};
  const postorder = (callback) => {};
  const height = (node) => {};
  const depth = (node) => {};
  const isBalanced = () => {};
  const rebalance = () => {};
  const getRoot = () => {};

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

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
tree.levelOrder((node) => console.log(node.value));
tree.preorder((node) => console.log(node.value));
tree.postorder((node) => console.log(node.value));
tree.inorder((node) => console.log(node.value));
tree.insert(200);
tree.insert(136);
tree.insert(214);
tree.insert(333);
tree.insert(165);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
tree.levelOrder((node) => console.log(node.value));
tree.preorder((node) => console.log(node.value));
tree.postorder((node) => console.log(node.value));
tree.inorder((node) => console.log(node.value));
