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

        /* QUANTITY EVENTS */
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
                    $counter.val(999);
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

        /* BOUGHT ACTION */
        $node.find(".bought").click(function () {
            $node.find(".row").fadeOut(250, function () {
                $node.find(".plus").addClass("button-hide");
                $node.find(".minus").addClass("button-hide");
                $node.find(".bought").addClass("button-none");
                $node.find(".delete").addClass("button-none");
                $node.find(".unbought").removeClass("button-none");
                $node.find(".row").fadeIn(250);
            })
        });

        /* UNBOUGHT ACTION */
        $node.find(".unbought").click(function () {
            $node.find(".row").fadeOut(250, function () {
                $node.find(".plus").removeClass("button-hide");
                $node.find(".minus").removeClass("button-hide");
                $node.find(".bought").removeClass("button-none");
                $node.find(".delete").removeClass("button-none");
                $node.find(".unbought").addClass("button-none");
                $node.find(".row").fadeIn(250);
            })
        });
    }

    function addButtFunc() {
        var $field = $(".field");
        var product = $field.val().trim();

        if (product)
            addItem(product);
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