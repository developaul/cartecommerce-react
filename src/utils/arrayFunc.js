const countDuplicateItemArray = ( value, array ) => {

    let count = 0;

    array.forEach( arrayValue => {
        if( arrayValue === value ) {
            count++;
        }
    });

    return count;
};

const removeArrayDuplicates = array => Array.from( new Set( array ) );

const removeItemArray = ( array, item ) => {

    const index = array.indexOf( item );

    if( index > -1 ) {
        array.split( index, 1 );
    }

    return array;
};

export {
    countDuplicateItemArray,
    removeArrayDuplicates,
    removeItemArray
}