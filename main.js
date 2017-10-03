/**
 * Created by sannguyen on 29.09.17.
 */


$(function () {
    var $list= $(".left-container");
    var ITEM_TEMPLATE = $(".item-template").html();

    function addItem(title) {
        var $node = $(ITEM_TEMPLATE);
        $node.find(".name-part").text(title);
        $list.append($node);

        /* QUANTITY EVENTS*/
        var quantity = 1;
        var $counter = $node.find(".counter");

        $node.find(".plus").click(function () {
            if (quantity === 1)
                $node.find(".minus").removeClass("dissable");
            if (quantity !== 999)
                quantity++;
            $counter.val(quantity);
            if (quantity === 999)
                $node.find(".plus").addClass("dissable");
        });

        $node.find(".minus").click(function () {
            if (quantity === 999)
                $node.find(".plus").removeClass("dissable");
            if (quantity !== 1)
                quantity--;
            $counter.val(quantity);
            if (quantity === 1)
                $node.find(".minus").addClass("dissable");
        });

        $counter.change(function () {

            var input = parseInt($counter.val(), 10);

            if (input > 0 && input === input) {
                quantity = input;

                if (quantity !== 1) $node.find(".minus").removeClass("dissable");
                else $node.find(".minus").addClass("dissable");

                if (quantity !== 999) $node.find(".plus").removeClass("dissable");
                else $node.find(".plus").addClass("dissable");

                if (input >= 999) {
                    $node.find(".plus").addClass("dissable");
                    quantity = 999;
                    $counter.val(input);
                } else if (input === 1) {
                    $node.find(".minus").addClass("dissable");
                    $counter.val(input);
                }
                else
                    $counter.val(input);

            }
            else
                $counter.val(quantity);
        });
        
        /* DELETE ACTION */
        $node.find(".delete").click(function () {
            $node.remove();
        });
    }

    function addButtFunc() {
        var $field = $(".field");
        if ($field.val().trim())
            addItem($field.val().trim());
        $field.val("");
    }




    /* EVENTS */
    $(".add").click(function() {
        addButtFunc();
    });

    $(document).keypress(function(e) {
        if(e.which === 13) addButtFunc();
    });

    /* EXAMPLES */
    addItem("iPhone X");
    addItem("Macbook Pro");
    addItem("Apple Watch 3");
});