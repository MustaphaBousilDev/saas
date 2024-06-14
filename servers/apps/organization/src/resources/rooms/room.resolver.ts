import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { CurrentUser, User } from '@app/shared';
import { RoomORG } from '../../models/rooms.schema';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => RoomORG)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => RoomORG)
  createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    console.log('################# room');
    console.log(createRoomInput.hotel);
    return this.roomService.create(createRoomInput, user);
  }

  @Query(() => [RoomORG], { name: 'rooms' })
  findAll() {
    return this.roomService.findAll();
  }

  @Query(() => RoomORG, { name: 'room' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.roomService.findOne(id);
  }

  @Mutation(() => RoomORG)
  updateRoom(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
    @CurrentUser() user: User,
  ) {
    console.log('######### update resolver');
    console.log(updateRoomInput);
    return this.roomService.update(id, updateRoomInput, user);
  }

  @Mutation(() => RoomORG)
  removeRoom(@Args('id', { type: () => Number }) id: number) {
    return this.roomService.remove(id);
  }
}
