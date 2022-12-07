import cheerio from 'cheerio'
export default {
    methods: {
        getCookie(name) {
            function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
            var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
            return match ? match[1] : null;
        },
        registerCookie(cookie) {
            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();

            document.cookie =
               cookie + ";" + expires + 'SameSite=none;';
        },
        pageProcessor(html, element) {
            if (!element.startsWith("<")) element = "<" + element

            let split = html.split(element);
            for (let i = 1; i < split.length; i++) {
                split[i] = element + split[i];
            }
            console.log(split)
            // let logoSplit = sectionSplit[1].split("<h2");
            // sectionSplit[1] = logoSplit[0]
            // logoSplit = logoSplit.splice(1, logoSplit.length)
            // for (let i = 0; i < logoSplit.length; i++) {
            //     logoSplit[i] = "<h2" + logoSplit[i];
            //     console.log(logoSplit[i])
            //     let $ = cheerio.load(logoSplit[i])

            //     let logoSection = {
            //         title: null, image: null, link: null,
            //     }
            //     if ($("h2")[0]) logoSection.title = $("h2")[0].children[0].data
            //     if ($("img")[0]) logoSection.image = $("img")[0].attribs.src
            //     if ($("a")[0]) logoSection.link = $("a")[0].attribs.href

            //     logoSplit[i] = logoSection

            // }


            return split
        }

        ,
        elementExtractor(html, titleElement) {
            console.log('element')

            let $ = cheerio.load(html)
            let obj = {
                title: null, image: null, link: [], text: []
            }

            if ($(titleElement).length > 0) {
                if ($(titleElement)[0].children.length > 0) {
                    obj.title = $(titleElement)[0].children[0].data
                }
            }
            if ($("p").length > 0) {
                let array = Array.from($("p"))
                for (let items of array) {
                    if (items.children.length > 0) {
                        obj.text.push(items.children[0].data)
                    }
                }
                // if ($("p")[0].children.length > 0) {
                //     console.log($("p"))
                //     if ($("p")[0].children) obj.text = $("p")[0].children[0].data

                // }
            }

            if ($("img")[0]) obj.image = $("img")[0].attribs.src

            if ($("a")[0]) obj.link = $("a")[0].attribs.href
            // if ($("a").length > 0) {
            //     let array = Array.from($("a"))
            //     for (let items of array) {
            //         if (items.children.length > 0) {
            //             obj.link.push(items.children[0].data)
            //         }
            //     }
            // if ($("p")[0].children.length > 0) {
            //     console.log($("p"))
            //     if ($("p")[0].children) obj.text = $("p")[0].children[0].data

            // }
            // }

            return obj;
        }

    }
}