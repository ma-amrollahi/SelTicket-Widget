use std::{fs::{self, File}, io::{Error, Write}};

mod element;

use crate::element::Element;

fn main() -> Result<(), Error> {
    
    let html = fs::read_to_string("../widget/dist/index.html")?;
    
    let mut elements = Vec::with_capacity(2);

    for line in html.lines() {
        if line.contains("</head>") {
            break;
        }
        if line.contains("selticket") {
            elements.push(Element::from(line));
        }
    }

    let mut js_file = format!(r#"(()=>{{let loaded=0;function handleLoad(){{loaded++;if(loaded==={})window.mountSelTicketWidget()}}"#, elements.len());

    for (index, element) in elements.iter().enumerate() {
        let name = format!("{}_{}", element.tag_name, index);
        js_file.push_str(
            format!(r#"const {name}=document.createElement("{}");"#, element.tag_name).as_str()
        );
        for (key, value) in element.attributes.iter() {
            js_file.push_str(
                format!(r#"{name}.{key}="{value}";"#).as_str()
            );
        }
        js_file.push_str(
            format!("{name}.onload=handleLoad;if(!document.head.contains({name}))document.head.appendChild({name});").as_str()
        );
    }
    

    js_file.push_str("})()");

    let mut new_js_file = File::create("../widget/dist/index.js")?;
    new_js_file.write_all(js_file.as_bytes())?;

    fs::remove_file("../widget/dist/index.html")?;

    Ok(())
}
