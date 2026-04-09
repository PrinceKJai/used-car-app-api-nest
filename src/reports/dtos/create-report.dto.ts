import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportsDto {
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(2000)
    @Max(2050)
    @IsNumber()
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
}