 function deDuplicate(arr) {
    let uniqueArr = arr.filter((elem, index) => {
        return arr.indexOf(elem) === index;
      });
    return uniqueArr;      
 }
 const mergeSort =  (arr)=>{
    
    if (arr.length==1) {
      
        return arr;
        
    } else {
        let midPoint = Math.ceil((arr.length)/2) ;
        let leftSide = mergeSort(arr.slice(0,midPoint));
        let rightSide = mergeSort(arr.slice(midPoint,arr.length));
        let tempArr = [];
        let j =0;
        for (let i = 0; i < leftSide.length; i++) {
            
            if (leftSide[i]<rightSide[j]) {
                tempArr.push(leftSide[i]);
             
               if (i==leftSide.length-1 )tempArr= tempArr.concat(rightSide.slice(j,rightSide.length));
                
            }else {

               

                    tempArr.push(rightSide[j]);
                    j++;
                    i--;
                    if (j==rightSide.length){
                        tempArr= tempArr.concat(leftSide.slice(i+1,leftSide.length));
                        break;
                    }

                
               
            }
        }
        return tempArr;
    }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
const node = (value)=>{
    return{
        data:  null||value,
        left:null,
        right:null

    };
}

const tree = (array)=>{
    
    return{
        mainArray:array,
        root:null,
        buildTree: function(array){
         sortedArray = deDuplicate(mergeSort(array)) ;
         this.root=recursiveTree(sortedArray)
          return root;
            
          function recursiveTree(array) {
            if (array.length==1){
                let newNode = node(array[0]);
                this.root=newNode;
                return newNode;
              }else if(array.length==0){

                return null;
              }else{    
                let midPoint = Math.ceil((array.length-1)/2);
                let leftTree = recursiveTree(array.slice(0,midPoint));
                let rightTree = recursiveTree(array.slice(midPoint+1,array.length));
                let newNode = node(array[midPoint]);
                newNode.left=leftTree;
                newNode.right=rightTree;
                return newNode;
                
              }
             
          }
        },
        
        insert: function(value){
            if (value>this.root.data) {
                if (this.root.right==null) {
                    let newNode=node(value);
                    this.root.right=newNode; 
                    
                }
                else{
                    let temRoot = this.root;
                    this.root=this.root.right;
                    this.insert(value); 
                    this.root=temRoot;
                }
               
               
            }
            if (value<this.root.data) {
                if (this.root.left==null) {
                    let newNode=node(value);
                    this.root.left=newNode; 
                    
                }
                else{
                    let temRoot = this.root;
                    this.root=this.root.left;
                    this.insert(value); 
                    this.root=temRoot;
                }
            }
            if(value==this.root.data){
              console.log("value already exist");
            }
           
        },
        delete: function(value){
            const findLeftestNode = function(node){
                if (node.left==null) {
                
                 return node;
                }else{
                 
                 return findLeftestNode(node.left)
                 
                }
             };
            //found the node
            
            if(this.root.left!=null && value==this.root.left.data){
                let parent=this.root;
                let selectedNode = parent.left;
                let isLeaf = selectedNode.left==null && selectedNode.right==null;
                let leftChild = selectedNode.left!=null;
                let rightChild = selectedNode.right!=null;
               
                if(isLeaf) parent.left= null;
                else  if (leftChild&&!rightChild){    
                    parent.left=selectedNode.left;
                }
                else if(!leftChild&&rightChild){
                    parent.left=selectedNode.right;
                }
                else if(leftChild&&rightChild){
                    let replaceNode = findLeftestNode(selectedNode.right).data;
                    this.delete(replaceNode);
                   selectedNode.data= replaceNode;
                }              
              }
              else if(this.root.right!=null && value==this.root.right.data){
                let parent=this.root;
                let selectedNode = parent.right;
                let isLeaf = selectedNode.left==null && selectedNode.right==null;
                let leftChild = selectedNode.left!=null;
                let rightChild = selectedNode.right!=null;

                if (isLeaf) parent.right= null;
                else  if (leftChild&&!rightChild){    
                    parent.right=selectedNode.left;
                }else if(!leftChild&&rightChild){
                    parent.right=selectedNode.right;
                }else if(leftChild&&rightChild){
                    let replaceNode = findLeftestNode(selectedNode.right).data;
                    this.delete(replaceNode);
                   selectedNode.data= replaceNode;
                }
              
                
              }
              else if(value ==this.root.data){
               let fakeNode = node(Infinity);
               let temNode =null;
               fakeNode.left=this.root;
               temNode=this.root;
               this.root=fakeNode;
             
               this.delete(value);
               this.root=temNode;
              }
            
           //keep searching
            else if (value>this.root.data) {
                    let temRoot = this.root;
                    this.root=this.root.right;
                    
                   this.delete(value); 
                    this.root=temRoot;
               
            }
            else if (value<this.root.data) {
                    let temRoot = this.root;
                    this.root=this.root.left;
                    this.delete(value); 
                    this.root=temRoot; 
            }
        },
        find: function(value){
        let foundNode='N/A';
        if (this.root==null) {
            return foundNode
        }
        else if (value==this.root.data) {
            return this.root;
         }
            
         else if (value>this.root.data) {
            let temRoot = this.root;
            this.root=this.root.right;
                
            foundNode=  this.find(value); 
             this.root=temRoot;
           
        }
        else if (value<this.root.data) {
            let temRoot = this.root;
            this.root=this.root.left;
                
          foundNode=  this.find(value); 
            this.root=temRoot;
            
        }
       return foundNode;
        },
        levelOrder: function(fun) {
            let queue = [];
            let outputArray=[];
            const BFT=function(currentNode){
              if (typeof fun == 'function') {
                fun(currentNode.data);
              }if (typeof fun != 'function') {
                outputArray.push(currentNode.data);
              }
              

                
                if (currentNode.left!=null) {
                    queue.push(currentNode.left);
                }
                if (currentNode.right!=null) {
                    queue.push(currentNode.right);
                }
               
                if (queue.length!=0) {
                    BFT(queue.shift())
                    
                }
                if (queue.length==0) {
                    return outputArray;
                }
                
            }
            
           return BFT(this.root);
           
        },
        preOrder: function(fun){
            let outputArray=[];
            const DFT = function(currentNode){
                if (currentNode==null) {
                    return;
                }
                if(typeof fun =="function")fun(currentNode.data)
                else {outputArray.push(currentNode.data);}
                DFT(currentNode.left);
                DFT(currentNode.right)

            };
            DFT(this.root);
            return outputArray;
        },
        inOrder: function(fun){
            let outputArray=[];
            const DFT = function(currentNode){
                if (currentNode==null) {
                    return;
                }
                DFT(currentNode.left);
                if(typeof fun =="function")fun(currentNode.data)
                else {outputArray.push(currentNode.data);}
                DFT(currentNode.right)

            };
            DFT(this.root);
            return outputArray;

        },
        postOrder:function(fun){
            let outputArray=[];
            const DFT = function(currentNode){
                if (currentNode==null) {
                    return;
                }
                
                DFT(currentNode.left);
                DFT(currentNode.right)
                if(typeof fun =="function")fun(currentNode.data)
                else {outputArray.push(currentNode.data);}
            };
            DFT(this.root);
            return outputArray;

        },
        depth: function(value){
            let selectedNode=this.find(value);
            let rootNode = this.root;
            let d=0;
            const findDepth = function(n){
                if (n==selectedNode) return d;
                if(n==null){return null};
                d++;
                let leftPath = findDepth(n.left);
                let rightPath = findDepth(n.right);
                if (leftPath==null && rightPath==null) d--;
                    
                
                if(leftPath!=null)return leftPath;
                else if(rightPath!=null)return rightPath;
                    
                
            } 
            return findDepth(rootNode);
        },
        hight: function(value){
            let theNode = this.find(value);

            const findHight=function(n){
                if(n===null){return 0}
                let leftHight=findHight(n.left);
                let rightHight=findHight(n.right);
                if(leftHight>rightHight) return leftHight+1;
                else if(leftHight<=rightHight) return rightHight+1;
                
            }
            return findHight(theNode)-1;


        },
        isBalanced:function(){
            let leftTree=this.hight(this.root.left.data);
            let rightTree=this.hight(this.root.right.data);
            if(Math.abs(leftTree-rightTree)>1)return false;
            return true;
        },
        reBalance: function(){
            let newArr = this.inOrder();
            this.buildTree(newArr);

        }

    }
}
//Tests
let myTree=tree([10,20,30,40,50,60,70]);
myTree.buildTree([10,20,30,40,50,60,70]);
prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preOrder(),myTree.inOrder(),myTree.postOrder());
myTree.insert(110);
myTree.insert(120);
myTree.insert(105);
prettyPrint(myTree.root);
console.log(myTree.isBalanced());
myTree.reBalance();
prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preOrder(),myTree.inOrder(),myTree.postOrder());

