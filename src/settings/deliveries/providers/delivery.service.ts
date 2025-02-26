import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { CreateDeliveryDto } from '../dtos/createDeliveries.dto';

@Injectable()
export class DeliveryService {
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
  ) {}
  public async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    //get user  based on user id from body , later will change to getit from auth
    const user = await this.usersService.findUserById(13);
    console.log(user);
    //create delivery
    const delivery = this.deliveryRepository.create({
      ...createDeliveryDto,
      user: user,
    });
    //return the delivery
    return await this.deliveryRepository.save(delivery);
  }

  public async findOneById(id: number) {
    //get user id from request
    const user = await this.usersService.findUserById(13);
    //get delivery  by id
    return await this.deliveryRepository.findOne({
      where: { id: id },
    });
  }
  public async findAllByUserId() {
    //get user id from request
    //get all deliveries by user id
    return `This action returns all deliveries of a user`;
  }
  public async updateDelivery(id: number) {
    //get user id from request
    //get delivery  by id
    // apply changes and save
    return `This action updates a delivery ${id}`;
  }
  public async deleteDelivery(id: number) {
    //get user id from request
    //delete delivery  by id
    return `This action removes a delivery ${id}`;
  }
}
