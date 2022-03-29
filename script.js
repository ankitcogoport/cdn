var script_tag = document.getElementById("searcher");
var search_id = script_tag.getAttribute("data-search");

var head = document.getElementsByTagName("HEAD")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "https://ankitcogoport.github.io/cdn/style.css";
head.appendChild(link);

const api_url = `https://cms.cogoport.io/api/v1/form/${search_id}`;

var form = document.createElement("form");
form.setAttribute("id", "cdn_form");
document.getElementById("div").appendChild(form);

function GetFields(r) {
  switch (r.appearanceType) {
    case "Short":
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "form__input");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      if (r.required) {
        input.setAttribute("required", "");
      }
      if (r.defaultValue) {
        input.setAttribute("value", r.defaultValue);
      }
      return input;

    case "Long":
      var textarea = document.createElement("textarea");
      textarea.setAttribute("rows", "2");
      textarea.setAttribute("class", "form__input");
      textarea.setAttribute("id", r.id);
      textarea.setAttribute("name", r.id);
      if (r.required) {
        textarea.setAttribute("required", "");
      }
      if (r.defaultValue) {
        textarea.setAttribute("value", r.defaultValue);
      }
      return textarea;

    case "Number":
      var input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "form__input");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      if (r.required) {
        input.setAttribute("required", "");
      }
      if (r.defaultValue) {
        input.setAttribute("value", r.defaultValue);
      }
      return input;

    case "Boolean radio":
      var div = document.createElement("div");
      var span = document.createElement("span");
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      input.setAttribute("value", Boolean(1));
      if (r.required) {
        input.setAttribute("required", "");
      }
      if (r.defaultValue) {
        if (r.defaultValue === r.Truelabel) {
          input.setAttribute("checked", "");
        }
      }

      span.appendChild(input);
      var t = document.createTextNode(r.Truelabel);
      span.setAttribute("class", "form__input__options");
      span.appendChild(t);
      div.appendChild(span);
      var span = document.createElement("span");
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      input.setAttribute("value", Boolean(0));
      if (r.required) {
        input.setAttribute("required", "");
      }

      if (r.defaultValue) {
        if (r.defaultValue === r.Falselabel) {
          input.setAttribute("checked", "");
        }
      }
      span.appendChild(input);
      var t = document.createTextNode(r.Falselabel);
      span.setAttribute("class", "form__input__options");
      span.appendChild(t);
      div.appendChild(span);

      return div;

    case "Radio":
      var div = document.createElement("div");
      for (i = 0; i < r.options.values.length; i++) {
        var span = document.createElement("span");
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("value", r.options.values[i]);
        input.setAttribute("id", r.id);
        input.setAttribute("name", r.id);
        if (r.required) {
          input.setAttribute("required", "");
        }
        if (r.defaultValue) {
          if (r.defaultValue === r.options.values[i]) {
            input.setAttribute("checked", "");
          }
        }
        span.appendChild(input);
        span.setAttribute("class", "form__input__options");
        var t = document.createTextNode(r.options.values[i]);
        span.appendChild(t);
        div.appendChild(span);
      }
      return div;

    case "Checkbox":
      var div = document.createElement("div");
      for (i = 0; i < r.options.values.length; i++) {
        var span = document.createElement("span");
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("value", r.options.values[i]);
        input.setAttribute("id", r.id);
        input.setAttribute("name", r.id);
        input.setAttribute("class", r.id);
        if (r.defaultValue) {
          if (r.defaultValue === r.options.values[i]) {
            input.setAttribute("checked", "");
          }
        }
        span.appendChild(input);
        span.setAttribute("class", "form__input__options");
        var t = document.createTextNode(r.options.values[i]);
        span.appendChild(t);
        div.appendChild(span);
      }

      return div;

    case "Dropdown":
      var div = document.createElement("div");
      div.setAttribute("class", "select");

      var select = document.createElement("select");
      select.setAttribute("class", "slct");
      select.setAttribute("id", r.id);
      select.setAttribute("name", r.id);
      for (i = 0; i < r.options.values.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", r.options.values[i]);
        var t = document.createTextNode(r.options.values[i]);
        option.appendChild(t);
        select.appendChild(option);
      }
      div.appendChild(select);
      return div;

    case "Switch":
      var div = document.createElement("div");
      var label = document.createElement("label");
      label.setAttribute("class", "switch");
      label.setAttribute("for", r.id);
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      label.appendChild(input);
      var span = document.createElement("span");
      span.setAttribute("class", "slider round");
      label.appendChild(span);
      div.appendChild(label);
      return div;

    case "Date":
      var input = document.createElement("input");
      input.setAttribute("type", "date");
      input.setAttribute("class", "form__input");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      return input;

    case "Date and Time":
      var input = document.createElement("input");
      input.setAttribute("type", "datetime-local");
      input.setAttribute("class", "form__input");
      input.setAttribute("id", r.id);
      input.setAttribute("name", r.id);
      return input;

    default:
      var div = document.createElement("div");
      var t = document.createTextNode("Type Not Supported");
      div.appendChild(t);
      return div;
  }
}
var data;
let slug = "";
async function getapi(url) {
  const response = await fetch(url);
  data = await response.json();
  console.log(data);
  slug = data.slug;

  show(data.schema);
}
getapi(api_url);

function show(data) {
  for (let r of data) {
    var label = document.createElement("label");
    label.setAttribute("class", "form__label");
    label.setAttribute("for", r.id);
    var t = document.createTextNode(r.name);
    label.appendChild(t);
    form.appendChild(label);
    form.appendChild(GetFields(r));
  }
  var s = document.createElement("input");
  s.setAttribute("class", "form__button");
  s.setAttribute("type", "submit");
  s.setAttribute("value", "Submit");
  form.appendChild(s);

  document.getElementById("div").appendChild(form);

  const thisForm = document.getElementById("cdn_form");
  thisForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(thisForm);
    var result = Object.fromEntries(formData.entries());

    for (let fields of data) {
      var chk_id;
      var date_id;
      var date_time_id;
      if (fields.appearanceType === "Date") {
        date_id = fields.id;
        console.log("lsls", result[date_id]);
        if (!result[date_id]) {
          result[date_id] = null;
        } else {
          result[date_id];
        }
      }

      if (fields.appearanceType === "Date and Time") {
        date_time_id = fields.id;
        console.log("lsls", result[date_time_id]);
        if (!result[date_time_id]) {
          result[date_time_id] = null;
        } else {
          result[date_time_id];
        }
      }

      if (fields.appearanceType === "Checkbox") {
        let chk_array = [];
        // console.log("firld id",fields.id);
        document.querySelectorAll(`.${fields.id}`).forEach(function (elem) {
          if (elem.checked === true) {
            //   console.log("val",elem.value);
            chk_array.push(elem.value);
          }
          chk_id = fields.id;
        });
        result[chk_id] = chk_array;
        if (fields.required) {
          if (chk_array.length === 0) {
            alert("Checkbox is Required");
          }
        }
      }
    }

    console.log("Form Entries", result);
    const response = await fetch(
      `http://localhost:8000/api/v1/form/content/${slug}`,
      {
        method: "POST",
        body: JSON.stringify({ data: result }),
      }
    );

    const res = await response.json();
    console.log(res);
  });
}
