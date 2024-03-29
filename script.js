
let data = [];

const container = document.querySelector("[data-main-container]")
const template = document.getElementById("template");

const getData = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function main() {
    const url = "https://api.escuelajs.co/api/v1/products";
    try {
        data = await getData(url);
        for (let i = 0; i < data.length; i++) {
            const cloneTemplate = template.content.cloneNode(true);
            cloneTemplate.querySelector("[data-img]").src = data[i].images[0];
            cloneTemplate.querySelector("[data-title]").textContent = data[i].title;
            cloneTemplate.querySelector("[data-category]").textContent = data[i].category.name;
            cloneTemplate.querySelector("[data-description]").textContent = data[i].description.substring(0, 10) + "...";
            cloneTemplate.querySelector("[data-description-details]").textContent = data[i].description;
            cloneTemplate.querySelector("[data-price]").textContent = `$ ${data[i].price}`;
            cloneTemplate.querySelector("[data-like]").setAttribute("data-id", data[i].id);

            // check id in localStorage
            const productId = data[i].id.toString();
            if (localStorage.getItem(productId)) {
                cloneTemplate.querySelector("[data-like]").classList.add("color-like");
            }
            container.appendChild(cloneTemplate);
        }

        // Add event listener
        document.querySelectorAll("[data-like]").forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-id");
                if (button.classList.contains("color-like")) {
                    button.classList.remove("color-like");
                    localStorage.removeItem(productId.toString())
                } else {
                    button.classList.add("color-like");
                    localStorage.setItem(productId.toString(), true)
                }
            });
        });

        document.querySelectorAll('details').forEach(details => {
            const description = details.querySelector('[data-description]');
            const descriptionDetails = details.querySelector('[data-description-details]');

            details.addEventListener('toggle', () => {
                if (details.open) {
                    description.classList.add('hidden');
                    descriptionDetails.classList.remove('hidden');
                } else {
                    description.classList.remove('hidden');
                    descriptionDetails.classList.add('hidden');
                }
            });
        });

    } catch (error) {
        console.error(error);
    }
}

main()
