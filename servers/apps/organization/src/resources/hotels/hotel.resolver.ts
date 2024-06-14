import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { CreateHotelInput } from './dto/create-hotel.input';
import { HotelORG } from '../../models/hotel.schema';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => HotelORG)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Mutation(() => HotelORG)
  createHotel(
    @Args('createHotelInput')
    createHotelInput: CreateHotelInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    console.log('######################################');
    console.log('resolver');
    console.log(createHotelInput.city);
    return this.hotelService.create(createHotelInput, user);
  }

  @Query(() => [HotelORG], { name: 'hotels' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Query(() => HotelORG, { name: 'hotel' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.hotelService.findOne(id);
  }

  @Mutation(() => HotelORG)
  updateHotel(
    @Args('id') id: number,
    @Args('updateHotelInput')
    updateHotelInput: UpdateHotelInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.hotelService.update(id, updateHotelInput, user);
  }

  @Mutation(() => HotelORG)
  removeHotel(@Args('id', { type: () => Number }) id: number) {
    return this.hotelService.remove(id);
  }
}
