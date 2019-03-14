const add = require("../src/js/modules/add.js");

test("add test", () => {
    expect(add(1,1)).toEqual(2);
});