<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<div id="app">
    <div class="select2">
        <input class="search" type="search" v-model="findString" v-bind:placeholder="checkedItems" v-on:focus="showItemsList" v-on:keyup.enter="addNewItem">
        <select2 v-bind:data="filteredData" tag="false" v-show="showList"></select2>
    </div>
</div>


<script src="js/vue.js"></script>
<script src="js/main.js"></script>
</body>
</html>