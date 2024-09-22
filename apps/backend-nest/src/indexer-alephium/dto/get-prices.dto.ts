import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class GetPricesDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'The list of assets should not be empty' })
  @IsString({ each: true, message: 'Each asset must be a text chain' })
  assets: string[];
}
