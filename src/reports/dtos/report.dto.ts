import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    mileage: number;

    @Expose()
    approved: boolean;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}