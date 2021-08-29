$(".resizeable").resizable({
    containment: "#container"
});

$(".draggable").draggable({
    cursor: "crosshair",
    containment: "#container",
});

// Square
$(".square").resizable({
    handleSelector: ".win-size-grip-square"
});
$(".square").draggable({
    handleSelector: ".win-size-grip-square"
});

// Circle
$(".circle").resizable({
    handleSelector: ".win-size-grip-circle"
});
$(".circle").draggable({
    handleSelector: ".win-size-grip-circle"
});

// Text
$(".textbox").resizable({
    handleSelector: ".win-size-grip-text"
});
$(".textbox").draggable({
    handleSelector: ".win-size-grip-text"
});

// Headline
$(".headlinebox").resizable({
    handleSelector: ".win-size-grip-headline"
});
$(".headlinebox").draggable({
    handleSelector: ".win-size-grip-headline"
});

// Button
$(".button").resizable({
    handleSelector: ".win-size-grip-button"
});
$(".button").draggable({
    handleSelector: ".win-size-grip-button"
});

// Dropdown
$(".dropdown").resizable({
    handleSelector: ".win-size-grip-dropdown"
});
$(".dropdown").draggable({
    handleSelector: ".win-size-grip-dropdown"
});

// Checkmark
$(".checkmark").resizable({
    handleSelector: ".win-size-grip-checkmark"
});
$(".checkmark").draggable({
    handleSelector: ".win-size-grip-checkmark"
});

// Radiobutton
$(".radiobutton").resizable({
    handleSelector: ".win-size-grip-radiobutton"
});
$(".radiobutton").draggable({
    handleSelector: ".win-size-grip-radiobutton"
});



