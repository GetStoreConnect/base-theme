# Vanilla Javascript 💅

* [Download ZIP](https://github.com/keisto/vanilla-rangeslider/archive/master.zip)
* [Project page and demos](http://ionden.com/a/plugins/ion.rangeSlider/)
* [Support the plugin originator on GitHub sponsors](https://github.com/sponsors/IonDen)

## Description

* Removed the jQuery requirement from the original [ion.rangeSlider](https://github.com/IonDen/ion.rangeSlider) (Version: 2.3.1)
* Removed IE8 Support (if this is a big deal, let me know)
* Additional/Original skins can be found in the [css here](https://github.com/IonDen/ion.rangeSlider/blob/master/css/ion.rangeSlider.css)
* For full documentation visit the original [ion.rangeSlider](https://github.com/IonDen/ion.rangeSlider) as everything will work the same except the initializers (see the documentation below).

![ion.rangeSlider](_tmp/rangeslider.png)

## Dependencies

* None 🤯

## Usage

Add the following libraries to the page:

* rangeSlider.min.js

Add the following stylesheets to the page:

* rangeslider.min.css

## Install with NPM

Use [NPM](https://www.npmjs.com/package/ion-rangeslider) to download latest version of a plugin and install it directly in to your project.

* npm install vanilla-rangeslider


## Initialisation

The slider overrides a native text `input` element.

```html
<input type="text" id="example_id" name="example_name" value="" />
```

To initialise the slider, call ionRangeSlider on the element:

```javascript
ionRangeSlider('#example_id');
```

## Creating slider (all params)

An example of a customised slider:

```javascript
ionRangeSlider('#example_id', {
    min: 0,
    max: 5000,
    prefix: "$",
    grid: true,
    grid_num: 5,
    step: 100,
});
```

You can also initialise slider with `data-*` attributes of input tag:

```json
data-min="0"
data-max="10000"
data-from="1000"
data-to="9000"
data-type="double"
data-prefix="$"
data-grid="true"
data-grid-num="10"
```

## Public methods

To use public methods, at first you must save slider instance to variable:

```javascript
// Store slider into a variable
const myRangeSlider = ionRangeSlider('#example_id', {
    type: "double",
    min: 0,
    max: 1000,
    from: 200,
    to: 500,
    grid: true
});

// UPDATE - updates slider to any new values
myRangeSlider.update({
    from: 300,
    to: 400
});

// RESET - reset slider to it's inital values
myRangeSlider.reset();

// DESTROY - destroys slider and restores original input field
myRangeSlider.destroy();
```

### Support Ion-series plugins development

* [Support the plugin on GitHub sponsors](https://github.com/sponsors/IonDen)
* Donate direct to my Paypal account: [https://www.paypal.me/IonDen](https://www.paypal.me/IonDen)

### ☝️Support the originator

*but think of me* 🤵

<a href="https://www.buymeacoffee.com/keisto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/arial-blue.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
