import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(2000)
    @Max(2050)
    @IsNumber()
    @Transform(( { value }) => parseInt(value))
    year: number;

    @IsLatitude()
    @Transform(( { value }) => parseFloat(value))
    lat: number;

    @IsLongitude()
    @Transform(( { value }) => parseFloat(value))
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    @Transform(( { value }) => parseInt(value))
    mileage: number;
}