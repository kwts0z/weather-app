import { NextRequest } from "next/server";

const apiKey = process.env.API_KEY;

const axios = require('axios').default;

export async function GET(req: NextRequest){
    let place = req.nextUrl.searchParams.get('place');
    let lon;
    let lat;
    if(place){
        const x = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${apiKey}`);
        lon = x.data[0].lon;
        lat = x.data[0].lat;
    }else{
        lon = req.nextUrl.searchParams.get('lon');
        lat = req.nextUrl.searchParams.get('lat');
    }
    

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        return Response.json(response.data);
    } catch (error) {
        console.error(error);
    }
    return new Response(undefined, { status: 500 });
};