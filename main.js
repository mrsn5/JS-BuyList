/**
 * Created by sannguyen on 29.09.17.
 */


$(function () {
    var $list = $(".left-container");
    var $listupto = $("#up-to");
    var $listalready = $("#already");

    var ITEM_TEMPLATE = $(".item-template").html();
    var ICON_TEMPLATE_UPTO = $(".upto-buy-template").html();
    var ICON_TEMPLATE_ALREADY = $(".already-bought-template").html();


    function addItem(title) {
        var $node = $(ITEM_TEMPLATE);
        $node.find(".title").text(title);
        $list.append($node);
        $node.hide();
        $node.slideDown(function () {
            $node.show();
        });

        var $icon = $(ICON_TEMPLATE_UPTO);
        $icon.find("span").text(title);
        $icon.find(".left-quantity").text(1);
        $listupto.append($icon);

        var $iconalready = $(ICON_TEMPLATE_ALREADY);
        $iconalready.find("span").text(title);
        $iconalready.find(".bought-quantity").text(1);
        $listalready.append($iconalready);

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
            $icon.find(".left-quantity").text(quantity);
            $iconalready.find(".bought-quantity").text(quantity);
        });

        $node.find(".minus").click(function () {
            if (quantity === 999)
                $node.find(".plus").removeClass("dissable");
            if (quantity !== 1)
                quantity--;
            $counter.val(quantity);
            if (quantity === 1)
                $node.find(".minus").addClass("dissable");
            $icon.find(".left-quantity").text(quantity);
            $iconalready.find(".bought-quantity").text(quantity);
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
                    $icon.find(".left-quantity").text(quantity);
                    $iconalready.find(".bought-quantity").text(quantity);
                } else if (input === 1) {
                    $node.find(".minus").addClass("dissable");
                    $counter.val(input);
                    $icon.find(".left-quantity").text(quantity);
                    $iconalready.find(".bought-quantity").text(quantity);
                }
                else {
                    $counter.val(quantity);
                    $icon.find(".left-quantity").text(quantity);
                    $iconalready.find(".bought-quantity").text(quantity);
                }

            }
            else
                $counter.val(quantity);
        });

        /* DELETE ACTION */
        $node.find(".delete").click(function () {
            $icon.remove();
            $iconalready.remove();
            $node.slideUp(function () {
                $node.remove();
            });
        });

        /* BOUGHT ACTION */
        var bought = false;
        $node.find(".bought").click(function () {
            bought = true;
            $node.find(".row").fadeOut(250, function () {
                $node.find(".plus").addClass("hide");
                $node.find(".minus").addClass("hide");
                $node.find(".bought").addClass("none");
                $node.find(".delete").addClass("none");
                $node.find(".unbought").removeClass("none");
                $node.find(".name-part").addClass('name-bought');
                $icon.addClass("none");
                $iconalready.removeClass("none");
                $node.find(".row").fadeIn(250);
            });
        });

        /* UNBOUGHT ACTION */
        $node.find(".unbought").click(function () {
            bought = false;
            $node.find(".row").fadeOut(250, function () {
                $node.find(".plus").removeClass("hide");
                $node.find(".minus").removeClass("hide");
                $node.find(".bought").removeClass("none");
                $node.find(".delete").removeClass("none");
                $node.find(".unbought").addClass("none");
                $node.find(".name-part").removeClass('name-bought');
                $icon.removeClass("none");
                $iconalready.addClass("none");
                $node.find(".row").fadeIn(250);
            });
        });

        /* TITLE CHANGE ACTION */
        var edible = $node.find(".edit");
        var edited = $node.find(".title");
        edited.click(function () {
            if (!bought) {
                edited.addClass("none");
                edible.removeClass("none");
                edible.focus();
                edible.val(edited.text());
            }
        });


        edible.on("input", function () {
            function setChanges() {
                edited.removeClass("none");
                edible.addClass("none");
            }

            edible.keypress(function (e) {
                if (e.which === 13) {
                    setChanges();
                }
            });
            edible.blur(function () {
                setChanges();
            });

            title = edible.val();
            $node.find(".title").text(title);
            $icon.find("span").text(title);
            $iconalready.find("span").text(title);
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
    $(".add").click(function () {
        addButtFunc();
    });

    $(".field").focus(function () {
       $(this).keypress(function (e) {
           if (e.which === 13) addButtFunc();
       });
    });

    $(".badge").hover(function () {
        $(this).addClass("transition");
    });


    /* EXAMPLES */
    addItem("iPhone X");
    addItem("Macbook Pro");
    addItem("Apple Watch 3");
});