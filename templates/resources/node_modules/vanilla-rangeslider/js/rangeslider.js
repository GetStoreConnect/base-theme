const IonRangeSlider = function (element, initOptions= {}) {
    let input = element;
    let options = initOptions;
    let calc_count = 0;
    let update_tm = 0;
    let old_from = 0;
    let old_to = 0;
    let old_min_interval = null;
    let raf_id = null;
    let dragging = false;
    let force_redraw = false;
    let no_diapason = false;
    let has_tab_index = true;
    let is_key = false;
    let is_update = false;
    let is_start = true;
    let is_finish = false;
    let is_active = false;
    let is_resize = false;
    let is_click = false;

    let target = "base";

    // cache for links to all DOM elements
    const cache = {
        win: window,
        body: document.body,
        input: input,
        cont: null,
        rs: null,
        min: null,
        max: null,
        from: null,
        to: null,
        single: null,
        bar: null,
        line: null,
        s_single: null,
        s_from: null,
        s_to: null,
        shad_single: null,
        shad_from: null,
        shad_to: null,
        edge: null,
        grid: null,
        grid_labels: []
    };

    // storage for measure variables
    const coords = {
        // left
        x_gap: 0,
        x_pointer: 0,

        // width
        w_rs: 0,
        w_rs_old: 0,
        w_handle: 0,

        // percents
        p_gap: 0,
        p_gap_left: 0,
        p_gap_right: 0,
        p_step: 0,
        p_pointer: 0,
        p_handle: 0,
        p_single_fake: 0,
        p_single_real: 0,
        p_from_fake: 0,
        p_from_real: 0,
        p_to_fake: 0,
        p_to_real: 0,
        p_bar_x: 0,
        p_bar_w: 0,

        // grid
        grid_gap: 0,
        big_num: 0,
        big: [],
        big_w: [],
        big_p: [],
        big_x: []
    };

    // storage for labels measure variables
    const labels = {
        // width
        w_min: 0,
        w_max: 0,
        w_from: 0,
        w_to: 0,
        w_single: 0,

        // percents
        p_min: 0,
        p_max: 0,
        p_from_fake: 0,
        p_from_left: 0,
        p_to_fake: 0,
        p_to_left: 0,
        p_single_fake: 0,
        p_single_left: 0
    };

    // default config
    const config = {
        skin: "flat",
        type: "single",

        min: 10,
        max: 100,
        from: null,
        to: null,
        step: 1,

        min_interval: 0,
        max_interval: 0,
        drag_interval: false,

        values: [],
        p_values: [],

        from_fixed: false,
        from_min: null,
        from_max: null,
        from_shadow: false,

        to_fixed: false,
        to_min: null,
        to_max: null,
        to_shadow: false,

        prettify_enabled: true,
        prettify_separator: " ",
        prettify: null,

        force_edges: false,

        keyboard: true,

        grid: false,
        grid_margin: true,
        grid_num: 4,
        grid_snap: false,

        hide_min_max: false,
        hide_from_to: false,

        prefix: "",
        postfix: "",
        max_postfix: "",
        decorate_both: true,
        values_separator: " — ",

        input_values_separator: ";",

        disable: false,
        block: false,

        extra_classes: "",

        scope: null,
        onStart: null,
        onChange: null,
        onFinish: null,
        onUpdate: null
    };


    // check if base element is input
    if (input.nodeName !== "INPUT") {
        console && console.warn && console.warn("Base element should be <input>!", input);
    }

    // config from data-attributes extends js config
    const config_from_data = {
        skin: input.dataset.skin,
        type: input.dataset.type,

        min: input.dataset.min,
        max: input.dataset.max,
        from: input.dataset.from,
        to: input.dataset.to,
        step: input.dataset.step,

        min_interval: input.dataset.minInterval,
        max_interval: input.dataset.maxInterval,
        drag_interval: input.dataset.dragInterval,

        values: input.dataset.values,

        from_fixed: input.dataset.fromFixed,
        from_min: input.dataset.fromMin,
        from_max: input.dataset.fromMax,
        from_shadow: input.dataset.fromShadow,

        to_fixed: input.dataset.toFixed,
        to_min: input.dataset.toMin,
        to_max: input.dataset.toMax,
        to_shadow: input.dataset.toShadow,

        prettify_enabled: input.dataset.prettifyEnabled,
        prettify_separator: input.dataset.prettifySeparator,

        force_edges: input.dataset.forceEdges,

        keyboard: input.dataset.keyboard,

        grid: input.dataset.grid,
        grid_margin: input.dataset.gridMargin,
        grid_num: input.dataset.gridNum,
        grid_snap: input.dataset.gridSnap,

        hide_min_max: input.dataset.hideMinMax,
        hide_from_to: input.dataset.hideFromTo,

        prefix: input.dataset.prefix,
        postfix: input.dataset.postfix,
        max_postfix: input.dataset.maxPostfix,
        decorate_both: input.dataset.decorateBoth,
        values_separator: input.dataset.valuesSeparator,

        input_values_separator: input.dataset.inputValuesSeparator,

        disable: input.dataset.disable,
        block: input.dataset.block,

        extra_classes: input.dataset.extraClasses,
    };

    config_from_data.values = config_from_data.values && config_from_data.values.split(",");

    for (let prop in config_from_data) {
        if (config_from_data.hasOwnProperty(prop)) {
            if (config_from_data[prop] === undefined || config_from_data[prop] === "") {
                delete config_from_data[prop];
            }
        }
    }


    // input value extends default config
    let val = input.value;
    if (val !== undefined && val !== "") {
        val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

        if (val[0] && val[0] == +val[0]) {
            val[0] = +val[0];
        }
        if (val[1] && val[1] == +val[1]) {
            val[1] = +val[1];
        }

        if (options && options.values && options.values.length) {
            config.from = val[0] && options.values.indexOf(val[0]);
            config.to = val[1] && options.values.indexOf(val[1]);
        } else {
            config.from = val[0] && +val[0];
            config.to = val[1] && +val[1];
        }
    }

    // js config extends default config
    Object.assign(config, options);

    // data config extends config
    Object.assign(config, config_from_data);
    options = config;

    let update_check = {};

    // default result object, returned to callbacks
    const result = {
        input: cache.input,
        slider: null,

        min: options.min,
        max: options.max,

        from: options.from,
        from_percent: 0,
        from_value: null,

        to: options.to,
        to_percent: 0,
        to_value: null
    };

    // HTML Templates
    const base_html =
        '<span class="irs">' +
        '<span class="irs-line" tabindex="0"></span>' +
        '<span class="irs-min">0</span><span class="irs-max">1</span>' +
        '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
        '</span>' +
        '<span class="irs-grid">1</span>';

    const single_html =
        '<span class="irs-bar irs-bar--single"></span>' +
        '<span class="irs-shadow shadow-single"></span>' +
        '<span class="irs-handle single"><i></i><i></i><i></i></span>';

    const double_html =
        '<span class="irs-bar"></span>' +
        '<span class="irs-shadow shadow-from"></span>' +
        '<span class="irs-shadow shadow-to"></span>' +
        '<span class="irs-handle from"><i></i><i></i><i></i></span>' +
        '<span class="irs-handle to"><i></i><i></i><i></i></span>';

    const disable_html =
        '<span class="irs-disable-mask"></span>';

    const init = function (is_update) {
        no_diapason = false;
        coords.p_step = convertToPercent(options.step, true);

        target = "base";

        toggleInput();
        append();
        setMinMax();

        if (is_update) {
            force_redraw = true;
            calc(true);

            // callbacks called
            callOnUpdate();
        } else {
            force_redraw = true;
            calc(true);

            // callbacks called
            callOnStart();
        }

        updateScene();
    };


    /**
     * Appends slider template to a DOM
     */
    const append = function () {
        const container_html = '<span class="irs irs--' + options.skin + ' ' + options.extra_classes + '"></span>';
        cache.input.insertAdjacentHTML('beforebegin', container_html);
        cache.input.setAttribute("readonly", "true");
        cache.cont = cache.input.previousElementSibling;
        result.slider = cache.cont;

        cache.cont.innerHTML = base_html;
        cache.rs = cache.cont.querySelector(".irs");
        cache.min = cache.cont.querySelector(".irs-min");
        cache.max = cache.cont.querySelector(".irs-max");
        cache.from = cache.cont.querySelector(".irs-from");
        cache.to = cache.cont.querySelector(".irs-to");
        cache.single = cache.cont.querySelector(".irs-single");
        cache.line = cache.cont.querySelector(".irs-line");
        cache.grid = cache.cont.querySelector(".irs-grid");

        if (options.type === "single") {
            cache.cont.insertAdjacentHTML('beforeend', single_html);
            cache.bar = cache.cont.querySelector(".irs-bar");
            cache.edge = cache.cont.querySelector(".irs-bar--single");
            cache.s_single = cache.cont.querySelector(".single");
            cache.from.style.visibility = "hidden";
            cache.to.style.visibility = "hidden";
            cache.shad_single = cache.cont.querySelector(".shadow-single");
        } else {
            cache.cont.insertAdjacentHTML('beforeend', double_html);
            cache.bar = cache.cont.querySelector(".irs-bar");
            cache.s_from = cache.cont.querySelector(".from");
            cache.s_to = cache.cont.querySelector(".to");
            cache.shad_from = cache.cont.querySelector(".shadow-from");
            cache.shad_to = cache.cont.querySelector(".shadow-to");

            setTopHandler();
        }

        if (options.hide_from_to) {
            cache.from.style.display = "none";
            cache.to.style.display = "none";
            cache.single.style.display = "none";
        }

        appendGrid();

        if (options.disable) {
            appendDisableMask();
            cache.input.disabled = true;
        } else {
            cache.input.disabled = false;
            removeDisableMask();
            bindEvents();
        }

        // block only if not disabled
        if (!options.disable) {
            if (options.block) {
                appendDisableMask();
            } else {
                removeDisableMask();
            }
        }

        if (options.drag_interval) {
            cache.bar.style.cursor = "ew-resize";
        }
    };

    /**
     * Determine which handler has a priority (works only for double slider type)
     */
    const setTopHandler = function () {
        const min = options.min,
            max = options.max,
            from = options.from,
            to = options.to;

        if (from > min && to === max) {
            cache.s_from.classList.add("type_last");
        } else if (to < max) {
            cache.s_to.classList.add("type_last");
        }
    };

    /**
     * Determine which handles was clicked last and which handler should have hover effect
     *
     * @param target {String}
     */
    const changeLevel = function (target) {
        switch (target) {
            case "single":
                coords.p_gap = toFixed(coords.p_pointer - coords.p_single_fake);
                cache.s_single.classList.add("state_hover");
                break;
            case "from":
                coords.p_gap = toFixed(coords.p_pointer - coords.p_from_fake);
                cache.s_from.classList.add("state_hover", "type_last");
                cache.s_to.classList.remove("type_last");
                break;
            case "to":
                coords.p_gap = toFixed(coords.p_pointer - coords.p_to_fake);
                cache.s_to.classList.add("state_hover", "type_last");
                cache.s_from.classList.remove("type_last");
                break;
            case "both":
                coords.p_gap_left = toFixed(coords.p_pointer - coords.p_from_fake);
                coords.p_gap_right = toFixed(coords.p_to_fake - coords.p_pointer);
                cache.s_to.classList.remove("type_last");
                cache.s_from.classList.remove("type_last");
                break;
        }
    };

    /**
     * Then slider is disabled -> append extra layer with opacity
     */
    const appendDisableMask = function () {
        cache.cont.insertAdjacentHTML('beforeend', disable_html);
        cache.cont.classList.add("irs-disabled");
    };

    /**
     * Then slider is not disabled -> remove disable mask
     */
    const removeDisableMask = function () {
        cache.cont.classList.remove(".irs-disable-mask");
        cache.cont.classList.remove("irs-disabled");
    };

    /**
     * Remove slider instance and unbind all events
     */
    const remove = function () {
        cache.cont.remove();
        cache.cont = null;

        cache.win.removeEventListener("keydown", key.bind(this, 'keyboard'));
        cache.body.removeEventListener("touchmove", pointerMove.bind(this));
        cache.body.removeEventListener("mousemove", pointerMove.bind(this));
        cache.win.removeEventListener("touchend", pointerUp.bind(this));
        cache.win.removeEventListener("mouseup", pointerUp.bind(this));

        cache.grid_labels = [];
        coords.big = [];
        coords.big_w = [];
        coords.big_p = [];
        coords.big_x = [];

        cancelAnimationFrame(raf_id);
    };

    /**
     * bind all slider events
     */
    const bindEvents = function () {
        if (no_diapason) {
            return;
        }
        cache.body.addEventListener('touchmove', pointerMove.bind(this));
        cache.body.addEventListener('mousemove', pointerMove.bind(this));

        cache.win.addEventListener('touchend', pointerUp.bind(this));
        cache.win.addEventListener('mouseup', pointerUp.bind(this));

        cache.line.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});
        cache.line.addEventListener('mousedown', pointerClick.bind(this, 'click'));
        cache.line.addEventListener('focus', pointerFocus.bind(this));

        if (options.drag_interval && options.type === "double") {
            cache.bar.addEventListener('touchstart', pointerDown.bind(this, 'both'), {passive: true});
            cache.bar.addEventListener('mousedown', pointerDown.bind(this, 'both'));
        } else {
            cache.bar.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});
            cache.bar.addEventListener('mousedown', pointerClick.bind(this, 'click'));
        }

        if (options.type === "single") {
            cache.single.addEventListener('touchstart', pointerDown.bind(this, 'single'), {passive: true});
            cache.s_single.addEventListener('touchstart', pointerDown.bind(this, 'single'), {passive: true});
            cache.shad_single.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});

            cache.single.addEventListener('mousedown', pointerDown.bind(this, 'single'));
            cache.s_single.addEventListener('mousedown', pointerDown.bind(this, 'single'));
            cache.edge.addEventListener('mousedown', pointerClick.bind(this, 'click'));
            cache.shad_single.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});
        } else {
            cache.single.addEventListener('touchstart', pointerDown.bind(this, null), {passive: true});
            cache.single.addEventListener('mousedown', pointerDown.bind(this, null));

            cache.from.addEventListener('touchstart', pointerDown.bind(this, 'from'), {passive: true});
            cache.s_from.addEventListener('touchstart', pointerDown.bind(this, 'from'), {passive: true});
            cache.to.addEventListener('touchstart', pointerDown.bind(this, 'to'), {passive: true});
            cache.s_to.addEventListener('touchstart', pointerDown.bind(this, 'to'), {passive: true});
            cache.shad_from.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});
            cache.shad_to.addEventListener('touchstart', pointerClick.bind(this, 'click'), {passive: true});

            cache.from.addEventListener('mousedown', pointerDown.bind(this, 'from'));
            cache.s_from.addEventListener('mousedown', pointerDown.bind(this, 'from'));
            cache.to.addEventListener('mousedown', pointerDown.bind(this, 'to'));
            cache.s_to.addEventListener('mousedown', pointerDown.bind(this, 'to'));
            cache.shad_from.addEventListener('mousedown', pointerClick.bind(this, 'click'));
            cache.shad_to.addEventListener('mousedown', pointerClick.bind(this, 'click'));
        }

        if (options.keyboard) {
            cache.line.addEventListener('keydown', key.bind(this, 'keyboard'));
        }
    };

    /**
     * Focus with tabIndex
     *
     * @param e {Object} event object
     */
    const pointerFocus = function (e) {
        if (!target) {
            let x, $handle;

            if (options.type === "single") {
                $handle = cache.single;
            } else {
                $handle = cache.from;
            }

            x = $handle.getBoundingClientRect().left;
            x += ($handle.getBoundingClientRect().width / 2) - 1;
            pointerClick("single", {preventDefault: function () {}, pageX: x});
        } else {
            cache.line.focus();
        }
    };

    /**
     * Mousemove or touchmove (only for handlers)
     *
     * @param e {Object} event object
     */
    const pointerMove = function (e) {
        if (!dragging) {
            return;
        }

        const x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX; // TODO
        coords.x_pointer = x - coords.x_gap;
        calc();
    };

    /**
     * Mouseup or touchend
     * only for handlers
     *
     * @param e {Object} event object
     */
    const pointerUp = function (e) {
        if (is_active) {
            is_active = false;
        } else {
            return;
        }

        const hoverState = cache.cont.querySelector(".state_hover");

        if (hoverState) {
            hoverState.classList.remove("state_hover");
        }

        force_redraw = true;

        updateScene();
        restoreOriginalMinInterval();
        // callbacks call
        if (cache.cont.contains(e.target) || dragging) {
            callOnFinish();
        }

        dragging = false;
    };

    /**
     * Mousedown or touchstart
     * only for handlers
     *
     * @param destination {String|null}
     * @param e {Object} event object
     */
    const pointerDown = function (destination, e) {
        e.preventDefault();
        const x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX; // TODO
        if (e.button === 2) {
            return;
        }

        if (destination === "both") {
            setTempMinInterval();
        }

        if (!destination) {
            destination = target || "from";
        }

        target = destination;

        is_active = true;
        dragging = true;

        coords.x_gap = cache.rs.getBoundingClientRect().left;
        coords.x_pointer = x - coords.x_gap;

        calcPointerPercent();
        changeLevel(destination);

        cache.line.dispatchEvent(new Event("focus"));

        updateScene();
    };

    /**
     * Mousedown or touchstart
     * for other slider elements, like diapason line
     *
     * @param destination {String}
     * @param e {Object} event object
     */
    const pointerClick = function (destination, e) {
        e.preventDefault();
        const x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX; // TODO
        if (e.button === 2) {
            return;
        }

        target = destination;

        is_click = true;
        coords.x_gap = cache.rs.getBoundingClientRect().left;
        coords.x_pointer = +(x - coords.x_gap).toFixed();

        force_redraw = true;
        calc();

        cache.line.dispatchEvent(new Event("focus"));
    };

    /**
     * Keyboard controls for focused slider
     *
     * @param destination {String}
     * @param e {Object} event object
     * @returns {boolean|undefined}
     */
    const key = function (destination, e) {
        if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
            return;
        }

        switch (e.which) {
            case 83: // W
            case 65: // A
            case 40: // DOWN
            case 37: // LEFT
                e.preventDefault();
                moveByKey(false);
                break;

            case 87: // S
            case 68: // D
            case 38: // UP
            case 39: // RIGHT
                e.preventDefault();
                moveByKey(true);
                break;
        }
    };

    /**
     * Move by key
     *
     * @param right {boolean} direction to move
     */
    const moveByKey = function (right) {
        let p = coords.p_pointer;
        const p_step = options.step / ((options.max - options.min) / 100);

        right ? p += p_step : p -= p_step;

        coords.x_pointer = toFixed(coords.w_rs / 100 * p);
        is_key = true;
        calc();
    };

    /**
     * Set visibility and content
     * of Min and Max labels
     */
    const setMinMax = function () {
        if (!options) {
            return;
        }

        if (options.hide_min_max) {
            cache.min.style.display = "none";
            cache.max.style.display = "none";
            return;
        }

        if (options.values.length) {
            cache.min.innerHTML = decorate(options.p_values[options.min]);
            cache.max.innerHTML = decorate(options.p_values[options.max]);
        } else {
            const min_pretty = _prettify(options.min);
            const max_pretty = _prettify(options.max);

            result.min_pretty = min_pretty;
            result.max_pretty = max_pretty;

            cache.min.innerHTML = decorate(min_pretty, options.min);
            cache.max.innerHTML = decorate(max_pretty, options.max);
        }

        labels.w_min = cache.min.offsetWidth;
        labels.w_max = cache.max.offsetWidth;
    };

    /**
     * Then dragging interval, prevent interval collapsing
     * using min_interval option
     */
    const setTempMinInterval = function () {
        const interval = result.to - result.from;

        if (old_min_interval === null) {
            old_min_interval = options.min_interval;
        }

        options.min_interval = interval;
    };

    const restoreOriginalMinInterval = function () {
        if (old_min_interval !== null) {
            options.min_interval = old_min_interval;
            old_min_interval = null;
        }
    };


    // Calculations

    /**
     * All calculations and measures start here
     *
     * @param update {boolean=}
     */
    const calc = function (update) {
        if (!options) {
            return;
        }

        calc_count++;

        if (calc_count === 10 || update) {
            calc_count = 0;
            coords.w_rs = cache.rs.offsetWidth;

            calcHandlePercent();
        }

        if (!coords.w_rs) {
            return;
        }

        calcPointerPercent();
        let handle_x = getHandleX();


        if (target === "both") {
            coords.p_gap = 0;
            handle_x = getHandleX();
        }

        if (target === "click") {
            coords.p_gap = coords.p_handle / 2;
            handle_x = getHandleX();

            if (options.drag_interval) {
                target = "both_one";
            } else {
                target = chooseHandle(handle_x);
            }
        }

        switch (target) {
            case "base":
                const w = (options.max - options.min) / 100,
                    f = (result.from - options.min) / w,
                    t = (result.to - options.min) / w;

                coords.p_single_real = toFixed(f);
                coords.p_from_real = toFixed(f);
                coords.p_to_real = toFixed(t);

                coords.p_single_real = checkDiapason(coords.p_single_real, options.from_min, options.from_max);
                coords.p_from_real = checkDiapason(coords.p_from_real, options.from_min, options.from_max);
                coords.p_to_real = checkDiapason(coords.p_to_real, options.to_min, options.to_max);

                coords.p_single_fake = convertToFakePercent(coords.p_single_real);
                coords.p_from_fake = convertToFakePercent(coords.p_from_real);
                coords.p_to_fake = convertToFakePercent(coords.p_to_real);

                target = null;

                break;

            case "single":
                if (options.from_fixed) {
                    break;
                }

                coords.p_single_real = convertToRealPercent(handle_x);
                coords.p_single_real = calcWithStep(coords.p_single_real);
                coords.p_single_real = checkDiapason(coords.p_single_real, options.from_min, options.from_max);

                coords.p_single_fake = convertToFakePercent(coords.p_single_real);

                break;

            case "from":
                if (options.from_fixed) {
                    break;
                }

                coords.p_from_real = convertToRealPercent(handle_x);
                coords.p_from_real = calcWithStep(coords.p_from_real);
                if (coords.p_from_real > coords.p_to_real) {
                    coords.p_from_real = coords.p_to_real;
                }
                coords.p_from_real = checkDiapason(coords.p_from_real, options.from_min, options.from_max);
                coords.p_from_real = checkMinInterval(coords.p_from_real, coords.p_to_real, "from");
                coords.p_from_real = checkMaxInterval(coords.p_from_real, coords.p_to_real, "from");

                coords.p_from_fake = convertToFakePercent(coords.p_from_real);

                break;

            case "to":
                if (options.to_fixed) {
                    break;
                }

                coords.p_to_real = convertToRealPercent(handle_x);
                coords.p_to_real = calcWithStep(coords.p_to_real);
                if (coords.p_to_real < coords.p_from_real) {
                    coords.p_to_real = coords.p_from_real;
                }
                coords.p_to_real = checkDiapason(coords.p_to_real, options.to_min, options.to_max);
                coords.p_to_real = checkMinInterval(coords.p_to_real, coords.p_from_real, "to");
                coords.p_to_real = checkMaxInterval(coords.p_to_real, coords.p_from_real, "to");

                coords.p_to_fake = convertToFakePercent(coords.p_to_real);

                break;

            case "both":
                if (options.from_fixed || options.to_fixed) {
                    break;
                }

                handle_x = toFixed(handle_x + (coords.p_handle * 0.001));

                coords.p_from_real = convertToRealPercent(handle_x) - coords.p_gap_left;
                coords.p_from_real = calcWithStep(coords.p_from_real);
                coords.p_from_real = checkDiapason(coords.p_from_real, options.from_min, options.from_max);
                coords.p_from_real = checkMinInterval(coords.p_from_real, coords.p_to_real, "from");
                coords.p_from_fake = convertToFakePercent(coords.p_from_real);

                coords.p_to_real = convertToRealPercent(handle_x) + coords.p_gap_right;
                coords.p_to_real = calcWithStep(coords.p_to_real);
                coords.p_to_real = checkDiapason(coords.p_to_real, options.to_min, options.to_max);
                coords.p_to_real = checkMinInterval(coords.p_to_real, coords.p_from_real, "to");
                coords.p_to_fake = convertToFakePercent(coords.p_to_real);

                break;

            case "both_one":
                if (options.from_fixed || options.to_fixed) {
                    break;
                }

                const real_x = convertToRealPercent(handle_x),
                    from = result.from_percent,
                    to = result.to_percent,
                    full = to - from,
                    half = full / 2;
                let new_from = real_x - half,
                    new_to = real_x + half;

                if (new_from < 0) {
                    new_from = 0;
                    new_to = new_from + full;
                }

                if (new_to > 100) {
                    new_to = 100;
                    new_from = new_to - full;
                }

                coords.p_from_real = calcWithStep(new_from);
                coords.p_from_real = checkDiapason(coords.p_from_real, options.from_min, options.from_max);
                coords.p_from_fake = convertToFakePercent(coords.p_from_real);

                coords.p_to_real = calcWithStep(new_to);
                coords.p_to_real = checkDiapason(coords.p_to_real, options.to_min, options.to_max);
                coords.p_to_fake = convertToFakePercent(coords.p_to_real);

                break;
        }

        if (options.type === "single") {
            coords.p_bar_x = (coords.p_handle / 2);
            coords.p_bar_w = coords.p_single_fake;

            result.from_percent = coords.p_single_real;
            result.from = convertToValue(coords.p_single_real);
            result.from_pretty = _prettify(result.from);

            if (options.values.length) {
                result.from_value = options.values[result.from];
            }
        } else {
            coords.p_bar_x = toFixed(coords.p_from_fake + (coords.p_handle / 2));
            coords.p_bar_w = toFixed(coords.p_to_fake - coords.p_from_fake);
            result.from_percent = coords.p_from_real;
            result.from = convertToValue(coords.p_from_real);
            result.from_pretty = _prettify(result.from);
            result.to_percent = coords.p_to_real;
            result.to = convertToValue(coords.p_to_real);
            result.to_pretty = _prettify(result.to);

            if (options.values.length) {
                result.from_value = options.values[result.from];
                result.to_value = options.values[result.to];
            }
        }

        calcMinMax();
        calcLabels();
    };


    /**
     * calculates pointer X in percent
     */
    const calcPointerPercent = function () {
        if (!coords.w_rs) {
            coords.p_pointer = 0;
            return;
        }

        if (coords.x_pointer < 0 || isNaN(coords.x_pointer)) {
            coords.x_pointer = 0;
        } else if (coords.x_pointer > coords.w_rs) {
            coords.x_pointer = coords.w_rs;
        }

        coords.p_pointer = toFixed(coords.x_pointer / coords.w_rs * 100);
    };

    // TODO refactor next 2 functions
    const convertToRealPercent = function (fake) {
        const full = 100 - coords.p_handle;
        return fake / full * 100;
    };

    const convertToFakePercent = function (real) {
        const full = 100 - coords.p_handle;
        return real / 100 * full;
    };

    const getHandleX = function () {
        const max = 100 - coords.p_handle;
        let x = toFixed(coords.p_pointer - coords.p_gap);

        if (x < 0) {
            x = 0;
        } else if (x > max) {
            x = max;
        }

        return x;
    };

    const calcHandlePercent = function () {
        if (options.type === "single") {
            coords.w_handle = cache.s_single.offsetWidth;
        } else {
            coords.w_handle = cache.s_from.offsetWidth;
        }

        coords.p_handle = toFixed(coords.w_handle / coords.w_rs * 100);
    };

    /**
     * Find closest handle to pointer click
     *
     * @param real_x {Number}
     * @returns {String}
     */
    const chooseHandle = function (real_x) {
        if (options.type === "single") {
            return "single";
        } else {
            const m_point = coords.p_from_real + ((coords.p_to_real - coords.p_from_real) / 2);
            if (real_x >= m_point) {
                return options.to_fixed ? "from" : "to";
            } else {
                return options.from_fixed ? "to" : "from";
            }
        }
    };

    /**
     * Measure Min and Max labels width in percent
     */
    const calcMinMax = function () {
        if (!coords.w_rs) {
            return;
        }

        labels.p_min = labels.w_min / coords.w_rs * 100;
        labels.p_max = labels.w_max / coords.w_rs * 100;
    };

    /**
     * Measure labels width and X in percent
     */
    const calcLabels = function () {
        if (!coords.w_rs || options.hide_from_to) {
            return;
        }

        if (options.type === "single") {
            labels.w_single = cache.single.offsetWidth;
            labels.p_single_fake = labels.w_single / coords.w_rs * 100;
            labels.p_single_left = coords.p_single_fake + (coords.p_handle / 2) - (labels.p_single_fake / 2);
            labels.p_single_left = checkEdges(labels.p_single_left, labels.p_single_fake);

        } else {
            labels.w_from = cache.from.offsetWidth;
            labels.p_from_fake = labels.w_from / coords.w_rs * 100;
            labels.p_from_left = coords.p_from_fake + (coords.p_handle / 2) - (labels.p_from_fake / 2);
            labels.p_from_left = toFixed(labels.p_from_left);
            labels.p_from_left = checkEdges(labels.p_from_left, labels.p_from_fake);

            labels.w_to = cache.to.offsetWidth;
            labels.p_to_fake = labels.w_to / coords.w_rs * 100;
            labels.p_to_left = coords.p_to_fake + (coords.p_handle / 2) - (labels.p_to_fake / 2);
            labels.p_to_left = toFixed(labels.p_to_left);
            labels.p_to_left = checkEdges(labels.p_to_left, labels.p_to_fake);

            labels.w_single = cache.single.offsetWidth;
            labels.p_single_fake = labels.w_single / coords.w_rs * 100;
            labels.p_single_left = ((labels.p_from_left + labels.p_to_left + labels.p_to_fake) / 2) - (labels.p_single_fake / 2);
            labels.p_single_left = toFixed(labels.p_single_left);
            labels.p_single_left = checkEdges(labels.p_single_left, labels.p_single_fake);

        }
    };

    // Drawings

    /**
     * Main function called in request animation frame
     * to update everything
     */
    const updateScene = function () {
        if (raf_id) {
            cancelAnimationFrame(raf_id);
            raf_id = null;
        }

        clearTimeout(update_tm);
        update_tm = null;

        if (!options) {
            return;
        }

        drawHandles();

        if (is_active) {
            raf_id = requestAnimationFrame(updateScene);
        } else {
            update_tm = setTimeout(updateScene, 300);
        }
    };

    /**
     * Draw handles
     */
    const drawHandles = function () {
        coords.w_rs = cache.rs.offsetWidth;
        if (!coords.w_rs) {
            return;
        }

        if (coords.w_rs !== coords.w_rs_old) {
            target = "base";
            is_resize = true;
        }

        if (coords.w_rs !== coords.w_rs_old || force_redraw) {
            setMinMax();
            calc(true);
            drawLabels();
            if (options.grid) {
                calcGridMargin();
                calcGridLabels();
            }
            force_redraw = true;
            coords.w_rs_old = coords.w_rs;
            drawShadow();
        }

        if (!coords.w_rs) {
            return;
        }

        if (!dragging && !force_redraw && !is_key) {
            return;
        }

        if (old_from !== result.from || old_to !== result.to || force_redraw || is_key) {
            drawLabels();

            cache.bar.style.left = coords.p_bar_x + "%";
            cache.bar.style.width = coords.p_bar_w + "%";

            if (options.type === "single") {
                cache.bar.style.left = "0";
                cache.bar.style.width = coords.p_bar_w + coords.p_bar_x + "%";

                cache.s_single.style.left = coords.p_single_fake + "%";

                cache.single.style.left = labels.p_single_left + "%";
            } else {
                cache.s_from.style.left = coords.p_from_fake + "%";
                cache.s_to.style.left = coords.p_to_fake + "%";

                if (old_from !== result.from || force_redraw) {
                    cache.from.style.left = labels.p_from_left + "%";
                }
                if (old_to !== result.to || force_redraw) {
                    cache.to.style.left = labels.p_to_left + "%";
                }

                cache.single.style.left = labels.p_single_left + "%";
            }

            writeToInput();

            if ((old_from !== result.from || old_to !== result.to) && !is_start) {
                cache.input.dispatchEvent(new Event("change"));
                cache.input.dispatchEvent(new Event("input"));
            }

            old_from = result.from;
            old_to = result.to;

            // callbacks call
            if (!is_resize && !is_update && !is_start && !is_finish) {
                callOnChange();
            }
            if (is_key || is_click) {
                is_key = false;
                is_click = false;
                callOnFinish();
            }

            is_update = false;
            is_resize = false;
            is_finish = false;
        }

        is_start = false;
        is_key = false;
        is_click = false;
        force_redraw = false;
    };

    /**
     * Draw labels
     * measure labels collisions
     * collapse close labels
     */
    const drawLabels = function () {
        if (!options) {
            return;
        }

        const values_num = options.values.length,
            p_values = options.p_values;
        let text_single,
            text_from,
            text_to,
            from_pretty,
            to_pretty;

        if (options.hide_from_to) {
            return;
        }

        if (options.type === "single") {

            if (values_num) {
                text_single = decorate(p_values[result.from]);
                cache.single.innerHTML = text_single;
            } else {
                from_pretty = _prettify(result.from);

                text_single = decorate(from_pretty, result.from);
                cache.single.innerHTML = text_single;
            }

            calcLabels();

            if (labels.p_single_left < labels.p_min + 1) {
                cache.min.style.visibility = "hidden";
            } else {
                cache.min.style.visibility = "visible";
            }

            if (labels.p_single_left + labels.p_single_fake > 100 - labels.p_max - 1) {
                cache.max.style.visibility = "hidden";
            } else {
                cache.max.style.visibility = "visible";
            }

        } else {
            if (values_num) {

                if (options.decorate_both) {
                    text_single = decorate(p_values[result.from]);
                    text_single += options.values_separator;
                    text_single += decorate(p_values[result.to]);
                } else {
                    text_single = decorate(p_values[result.from] + options.values_separator + p_values[result.to]);
                }
                text_from = decorate(p_values[result.from]);
                text_to = decorate(p_values[result.to]);
                cache.single.innerHTML = text_single;
                cache.from.innerHTML = text_from;
                cache.to.innerHTML = text_to;

            } else {
                from_pretty = _prettify(result.from);
                to_pretty = _prettify(result.to);

                if (options.decorate_both) {
                    text_single = decorate(from_pretty, result.from);
                    text_single += options.values_separator;
                    text_single += decorate(to_pretty, result.to);
                } else {
                    text_single = decorate(from_pretty + options.values_separator + to_pretty, result.to);
                }
                text_from = decorate(from_pretty, result.from);
                text_to = decorate(to_pretty, result.to);

                cache.single.innerHTML = text_single;
                cache.from.innerHTML = text_from;
                cache.to.innerHTML = text_to;

            }

            calcLabels();

            const min = Math.min(labels.p_single_left, labels.p_from_left),
                single_left = labels.p_single_left + labels.p_single_fake,
                to_left = labels.p_to_left + labels.p_to_fake;
            let max = Math.max(single_left, to_left);

            if (labels.p_from_left + labels.p_from_fake >= labels.p_to_left) {
                cache.from.style.visibility = "hidden";
                cache.to.style.visibility = "hidden";
                cache.single.style.visibility = "visible";

                if (result.from === result.to) {
                    if (target === "from") {
                        cache.from.style.visibility = "visible";
                    } else if (target === "to") {
                        cache.to.style.visibility = "visible";
                    } else if (!target) {
                        cache.from.style.visibility = "visible";
                    }
                    cache.single.style.visibility = "hidden";
                    max = to_left;
                } else {
                    cache.from.style.visibility = "hidden";
                    cache.to.style.visibility = "hidden";
                    cache.single.style.visibility = "visible";
                    max = Math.max(single_left, to_left);
                }
            } else {
                cache.from.style.visibility = "visible";
                cache.to.style.visibility = "visible";
                cache.single.style.visibility = "hidden";
            }

            min < labels.p_min + 1 ? cache.min.style.visibility = "hidden" : cache.min.style.visibility = "visible";
            max > 100 - labels.p_max - 1 ? cache.max.style.visibility = "hidden" : cache.max.style.visibility = "visible";
        }
    };

    /**
     * Draw shadow intervals
     */
    const drawShadow = function () {
        const o = options,
            c = cache,

            is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
            is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
            is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
            is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max);

        let from_min,
            from_max,
            to_min,
            to_max;

        if (o.type === "single") {
            if (o.from_shadow && (is_from_min || is_from_max)) {
                from_min = convertToPercent(is_from_min ? o.from_min : o.min);
                from_max = convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                from_min = toFixed(from_min - (coords.p_handle / 100 * from_min));
                from_max = toFixed(from_max - (coords.p_handle / 100 * from_max));
                from_min = from_min + (coords.p_handle / 2);

                c.shad_single.style.display = "block";
                c.shad_single.style.left = from_min + "%";
                c.shad_single.style.width = from_max + "%";
            } else {
                c.shad_single.style.display = "none";
            }
        } else {
            if (o.from_shadow && (is_from_min || is_from_max)) {
                from_min = convertToPercent(is_from_min ? o.from_min : o.min);
                from_max = convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                from_min = toFixed(from_min - (coords.p_handle / 100 * from_min));
                from_max = toFixed(from_max - (coords.p_handle / 100 * from_max));
                from_min = from_min + (coords.p_handle / 2);

                c.shad_from.style.display = "block";
                c.shad_from.style.left = from_min + "%";
                c.shad_from.style.width = from_max + "%";
            } else {
                c.shad_from.style.display = "none";
            }

            if (o.to_shadow && (is_to_min || is_to_max)) {
                to_min = convertToPercent(is_to_min ? o.to_min : o.min);
                to_max = convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
                to_min = toFixed(to_min - (coords.p_handle / 100 * to_min));
                to_max = toFixed(to_max - (coords.p_handle / 100 * to_max));
                to_min = to_min + (coords.p_handle / 2);

                c.shad_to.style.display = "block";
                c.shad_to.style.left = to_min + "%";
                c.shad_to.style.width = to_max + "%";
            } else {
                c.shad_to.style.display = "none";
            }
        }
    };


    /**
     * Write values to input element
     */
    const writeToInput = function () {
        if (options.type === "single") {
            if (options.values.length) {
                cache.input.setAttribute("value", result.from_value);
            } else {
                cache.input.setAttribute("value", result.from);
            }
            cache.input.dataset.from = result.from;
        } else {
            if (options.values.length) {
                cache.input.setAttribute("value", result.from_value + options.input_values_separator + result.to_value);
            } else {
                cache.input.setAttribute("value", result.from + options.input_values_separator + result.to);
            }
            cache.input.dataset.from = result.from;
            cache.input.dataset.to = result.to;
        }
    };

    // Callbacks

    const callOnStart = function () {
        writeToInput();

        if (options.onStart && typeof options.onStart === "function") {
            if (options.scope) {
                options.onStart.call(options.scope, result);
            } else {
                options.onStart(result);
            }
        }
    };
    const callOnChange = function () {
        writeToInput();

        if (options.onChange && typeof options.onChange === "function") {
            if (options.scope) {
                options.onChange.call(options.scope, result);
            } else {
                options.onChange(result);
            }
        }
    };
    const callOnFinish = function () {
        writeToInput();

        if (options.onFinish && typeof options.onFinish === "function") {
            if (options.scope) {
                options.onFinish.call(options.scope, result);
            } else {
                options.onFinish(result);
            }
        }
    };
    const callOnUpdate = function () {
        writeToInput();

        if (options.onUpdate && typeof options.onUpdate === "function") {
            if (options.scope) {
                options.onUpdate.call(options.scope, result);
            } else {
                options.onUpdate(result);
            }
        }
    };

    // Service methods

    const toggleInput = function () {
        cache.input.classList.toggle("irs-hidden-input");

        if (has_tab_index) {
            cache.input.setAttribute("tabindex", "-1");
        } else {
            cache.input.removeAttribute("tabindex");
        }

        has_tab_index = !has_tab_index;
    };

    /**
     * Convert real value to percent
     *
     * @param value {Number} X in real
     * @param no_min {boolean=} don't use min value
     * @returns {Number} X in percent
     */
    const convertToPercent = function (value, no_min) {
        let diapason = options.max - options.min,
            one_percent = diapason / 100,
            val, percent;

        if (!diapason) {
            no_diapason = true;
            return 0;
        }

        if (no_min) {
            val = value;
        } else {
            val = value - options.min;
        }

        percent = val / one_percent;

        return toFixed(percent);
    };

    /**
     * Convert percent to real values
     *
     * @param percent {Number} X in percent
     * @returns {Number} X in real
     */
    const convertToValue = function (percent) {
        let min = options.min,
            max = options.max,
            min_decimals = min.toString().split(".")[1],
            max_decimals = max.toString().split(".")[1],
            min_length, max_length,
            avg_decimals = 0,
            abs = 0;

        if (percent === 0) {
            return options.min;
        }
        if (percent === 100) {
            return options.max;
        }


        if (min_decimals) {
            min_length = min_decimals.length;
            avg_decimals = min_length;
        }
        if (max_decimals) {
            max_length = max_decimals.length;
            avg_decimals = max_length;
        }
        if (min_length && max_length) {
            avg_decimals = (min_length >= max_length) ? min_length : max_length;
        }

        if (min < 0) {
            abs = Math.abs(min);
            min = +(min + abs).toFixed(avg_decimals);
            max = +(max + abs).toFixed(avg_decimals);
        }

        let number = ((max - min) / 100 * percent) + min,
            string = options.step.toString().split(".")[1],
            result;

        if (string) {
            number = +number.toFixed(string.length);
        } else {
            number = number / options.step;
            number = number * options.step;

            number = +number.toFixed(0);
        }

        if (abs) {
            number -= abs;
        }

        string ? result = +number.toFixed(string.length) : result = toFixed(number);

        if (result < options.min) {
            result = options.min;
        } else if (result > options.max) {
            result = options.max;
        }

        return result;
    };

    /**
     * Round percent value with step
     *
     * @param percent {Number}
     * @returns percent {Number} rounded
     */
    const calcWithStep = function (percent) {
        let rounded = Math.round(percent / coords.p_step) * coords.p_step;

        if (rounded > 100) {
            rounded = 100;
        }
        if (percent === 100) {
            rounded = 100;
        }

        return toFixed(rounded);
    };

    const checkMinInterval = function (p_current, p_next, type) {
        let o = options, current, next;

        if (!o.min_interval) {
            return p_current;
        }

        current = convertToValue(p_current);
        next = convertToValue(p_next);

        if (type === "from") {
            if (next - current < o.min_interval) {
                current = next - o.min_interval;
            }
        } else {
            if (current - next < o.min_interval) {
                current = next + o.min_interval;
            }
        }

        return convertToPercent(current);
    };

    const checkMaxInterval = function (p_current, p_next, type) {
        let o = options, current, next;

        if (!o.max_interval) {
            return p_current;
        }

        current = convertToValue(p_current);
        next = convertToValue(p_next);

        if (type === "from") {
            if (next - current > o.max_interval) {
                current = next - o.max_interval;
            }
        } else {
            if (current - next > o.max_interval) {
                current = next + o.max_interval;
            }
        }

        return convertToPercent(current);
    };

    const checkDiapason = function (p_num, min, max) {
        let num = convertToValue(p_num);

        typeof min !== 'number' ? min = options.min : min;
        typeof max !== 'number' ? max = options.max : max;

        num < min ? num = min : num;
        num > max ? num = max : num;

        return convertToPercent(num);
    };

    const toFixed = function (num) {
        num = num.toFixed(20);
        return +num;
    };

    const _prettify = function (num) {
        if (!options.prettify_enabled) {
            return num;
        }

        if (options.prettify && typeof options.prettify === "function") {
            return options.prettify(num);
        } else {
            return prettify(num);
        }
    };

    const prettify = function (num) {
        return num.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + options.prettify_separator);
    };

    const checkEdges = function (left, width) {
        if (!options.force_edges) return toFixed(left);

        left < 0 ? left = 0 : left > 100 - width ? left = 100 - width : left;

        return toFixed(left);
    };

    const validate = function () {
        let o = options,
            r = result,
            v = o.values,
            vl = v.length,
            value,
            i;

        if (typeof o.min === "string") o.min = +o.min;
        if (typeof o.max === "string") o.max = +o.max;
        if (typeof o.from === "string") o.from = +o.from;
        if (typeof o.to === "string") o.to = +o.to;
        if (typeof o.step === "string") o.step = +o.step;

        if (typeof o.from_min === "string") o.from_min = +o.from_min;
        if (typeof o.from_max === "string") o.from_max = +o.from_max;
        if (typeof o.to_min === "string") o.to_min = +o.to_min;
        if (typeof o.to_max === "string") o.to_max = +o.to_max;

        if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

        if (o.max < o.min) {
            o.max = o.min;
        }

        if (vl) {
            o.p_values = [];
            o.min = 0;
            o.max = vl - 1;
            o.step = 1;
            o.grid_num = o.max;
            o.grid_snap = true;

            for (i = 0; i < vl; i++) {
                value = +v[i];

                if (!isNaN(value)) {
                    v[i] = value;
                    value = _prettify(value);
                } else {
                    value = v[i];
                }

                o.p_values.push(value);
            }
        }

        if (typeof o.from !== "number" || isNaN(o.from)) o.from = o.min;
        if (typeof o.to !== "number" || isNaN(o.to)) o.to = o.max;

        if (o.type === "single") {
            if (o.from < o.min) o.from = o.min;
            if (o.from > o.max) o.from = o.max;
        } else {
            if (o.from < o.min) o.from = o.min;
            if (o.from > o.max) o.from = o.max;

            if (o.to < o.min) o.to = o.min;
            if (o.to > o.max) o.to = o.max;

            if (update_check.from) {

                if (update_check.from !== o.from) {
                    if (o.from > o.to) o.from = o.to;
                }
                if (update_check.to !== o.to) {
                    if (o.to < o.from) o.to = o.from;
                }

            }

            if (o.from > o.to) o.from = o.to;
            if (o.to < o.from) o.to = o.from;

        }

        if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
            o.step = 1;
        }

        if (typeof o.from_min === "number" && o.from < o.from_min) {
            o.from = o.from_min;
        }

        if (typeof o.from_max === "number" && o.from > o.from_max) {
            o.from = o.from_max;
        }

        if (typeof o.to_min === "number" && o.to < o.to_min) {
            o.to = o.to_min;
        }

        if (typeof o.to_max === "number" && o.from > o.to_max) {
            o.to = o.to_max;
        }

        if (r) {
            if (r.min !== o.min) r.min = o.min;
            if (r.max !== o.max) r.max = o.max;
            if (r.from < r.min || r.from > r.max) r.from = o.from;
            if (r.to < r.min || r.to > r.max) r.to = o.to;
        }

        if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
            o.min_interval = 0;
        }

        if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
            o.max_interval = 0;
        }

        if (o.min_interval && o.min_interval > o.max - o.min) {
            o.min_interval = o.max - o.min;
        }

        if (o.max_interval && o.max_interval > o.max - o.min) {
            o.max_interval = o.max - o.min;
        }
    };

    const decorate = function (num, original) {
        let decorated = "",
            o = options;

        if (o.prefix) {
            decorated += o.prefix;
        }

        decorated += num;

        if (o.max_postfix) {
            if (o.values.length && num === o.p_values[o.max]) {
                decorated += o.max_postfix;
                if (o.postfix) {
                    decorated += " ";
                }
            } else if (original === o.max) {
                decorated += o.max_postfix;
                if (o.postfix) {
                    decorated += " ";
                }
            }
        }

        if (o.postfix) {
            decorated += o.postfix;
        }

        return decorated;
    };

    const updateFrom = function () {
        result.from = options.from;
        result.from_percent = convertToPercent(result.from);
        result.from_pretty = _prettify(result.from);
        if (options.values) {
            result.from_value = options.values[result.from];
        }
    };

    const updateTo = function () {
        result.to = options.to;
        result.to_percent = convertToPercent(result.to);
        result.to_pretty = _prettify(result.to);
        if (options.values) {
            result.to_value = options.values[result.to];
        }
    };

    const updateResult = function () {
        result.min = options.min;
        result.max = options.max;
        updateFrom();
        updateTo();
    };

    // Grid

    const appendGrid = function () {
        if (!options.grid) {
            return;
        }

        let o = options,
            i, z,

            total = o.max - o.min,
            big_num = o.grid_num,
            big_p = 0,
            big_w = 0,

            small_max = 4,
            local_small_max,
            small_p,
            small_w = 0,

            result,
            html = '';


        calcGridMargin();

        if (o.grid_snap) {
            big_num = total / o.step;
        }

        if (big_num > 50) big_num = 50;
        big_p = toFixed(100 / big_num);

        if (big_num > 4) {
            small_max = 3;
        }
        if (big_num > 7) {
            small_max = 2;
        }
        if (big_num > 14) {
            small_max = 1;
        }
        if (big_num > 28) {
            small_max = 0;
        }

        for (i = 0; i < big_num + 1; i++) {
            local_small_max = small_max;

            big_w = toFixed(big_p * i);

            if (big_w > 100) {
                big_w = 100;
            }
            coords.big[i] = big_w;

            small_p = (big_w - (big_p * (i - 1))) / (local_small_max + 1);

            for (z = 1; z <= local_small_max; z++) {
                if (big_w === 0) {
                    break;
                }

                small_w = toFixed(big_w - (small_p * z));

                html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
            }

            html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';

            result = convertToValue(big_w);
            if (o.values.length) {
                result = o.p_values[result];
            } else {
                result = _prettify(result);
            }

            html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
        }
        coords.big_num = Math.ceil(big_num + 1);

        cache.cont.classList.add("irs-with-grid");
        cache.grid.innerHTML = html;
        cacheGridLabels();
    };

    const cacheGridLabels = function () {
        for (let i = 0; i < coords.big_num; i++) {
            cache.grid_labels.push(cache.grid.querySelector(".js-grid-text-" + i));
        }

        calcGridLabels();
    };

    const calcGridLabels = function () {
        const start = [], finish = [],
            num = coords.big_num;
        for (let i = 0; i < num; i++) {
            coords.big_w[i] = cache.grid_labels[i].offsetWidth;
            coords.big_p[i] = toFixed(coords.big_w[i] / coords.w_rs * 100);
            coords.big_x[i] = toFixed(coords.big_p[i] / 2);

            start[i] = toFixed(coords.big[i] - coords.big_x[i]);
            finish[i] = toFixed(start[i] + coords.big_p[i]);
        }

        if (options.force_edges) {
            if (start[0] < -coords.grid_gap) {
                start[0] = -coords.grid_gap;
                finish[0] = toFixed(start[0] + coords.big_p[0]);

                coords.big_x[0] = coords.grid_gap;
            }

            if (finish[num - 1] > 100 + coords.grid_gap) {
                finish[num - 1] = 100 + coords.grid_gap;
                start[num - 1] = toFixed(finish[num - 1] - coords.big_p[num - 1]);

                coords.big_x[num - 1] = toFixed(coords.big_p[num - 1] - coords.grid_gap);
            }
        }

        calcGridCollision(2, start, finish);
        calcGridCollision(4, start, finish);

        for (let i = 0; i < num; i++) {
            const label = cache.grid_labels[i];
            if (coords.big_x[i] !== Number.POSITIVE_INFINITY) {
                label.style.marginLeft = -coords.big_x[i] + "%";
            }
        }
    };

    // Collisions Calc Beta
    // TODO: Refactor then have plenty of time
    const calcGridCollision = function (step, start, finish) {
        const num = coords.big_num;

        for (let i = 0; i < num; i += step) {
            let next_i = i + (step / 2);
            if (next_i >= num) {
                break;
            }
            const label = cache.grid_labels[next_i];

            if (finish[i] <= start[next_i]) {
                label.style.visibility = "visible";
            } else {
                label.style.visibility = "hidden";
            }
        }
    };

    const calcGridMargin = function () {
        if (!options.grid_margin) {
            return;
        }

        coords.w_rs = cache.rs.offsetWidth;
        if (!coords.w_rs) {
            return;
        }

        if (options.type === "single") {
            coords.w_handle = cache.s_single.offsetWidth;
        } else {
            coords.w_handle = cache.s_from.offsetWidth;
        }
        coords.p_handle = toFixed(coords.w_handle / coords.w_rs * 100);
        coords.grid_gap = toFixed((coords.p_handle / 2) - 0.1);

        cache.grid.style.width = toFixed(100 - coords.p_handle) + "%";
        cache.grid.style.left = coords.grid_gap + "%";
    };

    // Public methods
    const update = function (newOptions) {
        if (!input) {
            return;
        }

        is_update = true;

        options.from = result.from;
        options.to = result.to;
        update_check.from = result.from;
        update_check.to = result.to;

        options =  Object.assign(options, newOptions);
        validate();
        updateResult(newOptions);

        toggleInput();
        remove();
        init(true);
    };

    const reset = function () {
        if (!input) {
            return;
        }

        updateResult();
        update();
    };

    const destroy = function () {
        if (!input) {
            return;
        }

        toggleInput();
        input.removeAttribute("readonly");

        remove();
        input = null;
        options = null;
    }

    return {
        update: function(options) {
            update(options);
        },
        reset : function() {
            reset();
        },
        destroy : function() {
            destroy();
        },
        init : function () {
            validate();
            init();

            return this;
        },
    };
};

/**
 * Simple init function
 *
 * @param element {string|Element}
 * @param options {Object}
 */
function ionRangeSlider(element, options = null) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    return new IonRangeSlider(element, options).init();
}
