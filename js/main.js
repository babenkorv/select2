Vue.component('select2', {
    template:
    '<div >' +
        '<ul> ' +
            // '<input type="text" name="newItem" v-model="newItem" v-on:keyup.enter="addNewItem" v-show="true">' +
            '<li v-for="dataItem in data">' +
                '<label v-bind:for="dataItem.id">{{dataItem.value}}</label>' +
                '<input type="checkbox" v-bind:id="dataItem.id"  v-bind:value="dataItem.id" v-model="checkedItems">' +
            '</li>' +
        '</ul>' +
    '</div>',

    props: ['data', 'tag'],

    data: function () {
        return {
            checkedItems: [],
            showAddItemField: true,
            newItem: null,
        };
    },
    watch: {
        checkedItems: function () {
            this.$parent.$options.methods.getCheckedItems(this.checkedItems);
        }
    },
    methods: {
        addNewItem: function () {
            this.$parent.$options.methods.addNewItem(this.newItem);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        findString: '',
        sourceData: [
            {
                id: 1,
                value: 'one',
            },
            {
                id: 2,
                value: 'two',
            },
            {
                id: 3,
                value: 'three',
            },
        ],
        filteredData: [],
        checkedItems: [],
        showList: false,
    },

    created: function () {
        for (var i = 0; i < this.sourceData.length; i++) {
            this.sourceData[i].id = 'check_' + this.sourceData[i].id;
        }
        this.filteredData = this.sourceData;
    },

    watch: {
        findString: function () {
            this.filteredData = [];

            var findStringReg = new RegExp(this.findString, 'i');
            for (var i = 0; i < this.sourceData.length; i++) {
                if (this.sourceData[i].value.search(findStringReg) != -1) {
                    this.filteredData.push(this.sourceData[i]);
                }
            }
        },
    },
    methods: {
        getValue: function (index) {
            var selectedString = '';
            for (var i = 0; i < index.length; i++) {
                for (var j = 0; j < this.filteredData.length; j++) {
                    if (this.filteredData[j].id == index[i]) {
                        selectedString += this.filteredData[j].value + ' ';
                        break;
                    }
                }
            }
            return selectedString;
        },
        getCheckedItems: function (items) {
            app.$nextTick(function () {
                this.checkedItems = this.getValue(items);
            })
        },
        showItemsList: function () {
            this.showList = !this.showList;
        },
        addNewItem: function () {
            app.sourceData.push({value: this.findString});
        }
    }
});