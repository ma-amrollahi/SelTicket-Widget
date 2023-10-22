use std::collections::HashMap;

#[derive(Debug)]
pub struct Element {
    pub tag_name: String,
    pub attributes: HashMap<String, String>,
}

impl<'a> From<&'a str> for Element {
    fn from(line: &'a str) -> Self {

        let mut element = Self {
            tag_name: String::with_capacity(6),
            attributes: HashMap::with_capacity(3),
        };

        let mut chars = line.chars();

        while let Some(char) = chars.next() {
            match char {
                '<' => {
                    while let Some(char) = chars.next() {
                        if char.is_whitespace() {
                            break;
                        } else {
                            element.tag_name.push(char);
                        }
                    }
                },
                '>' => {
                    break;
                },
                c if c.is_alphabetic() => {
                    let mut name = String::from(c);
                    let mut value = String::new();
                    while let Some(char) = chars.next() {
                        if char == '=' {
                            chars.next();
                            break;
                        }
                        if char.is_whitespace() {
                            value.push_str("true");
                            break;
                        }
                        name.push(char);
                    }
                    if value.is_empty() {
                        while let Some(char) = chars.next() {
                            if char == '"' {
                                break;
                            }
                            value.push(char);
                        }
                    }
                    element.attributes.insert(name, value);
                },
                _ => {

                },
            }
        }

        element
    }
}