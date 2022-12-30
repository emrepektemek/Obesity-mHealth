import axios from "axios";


export async function getFood(besinAdi){

    url = `https://api.edamam.com/api/food-database/v2/parser?app_id=38e0a907&app_key=b3abec93057c35a5a5fa9630baeceb65&ingr=${besinAdi}&nutrition-type=cooking`;

    const response = await axios.get(url);

    return response.data.parsed[0];
}

