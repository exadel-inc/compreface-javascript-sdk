export const common_functions = {
    removeDublicates: function (array){
        let tempArray = [];
        let saveDublicate = [];

        for(let i = 0; i < array.length; i++){
            if(!saveDublicate.includes(array[i].subject)) tempArray.push([array[i].subject, array[i].similarity])

            saveDublicate.push(array[i].subject)
        }

        return tempArray;
    }
}