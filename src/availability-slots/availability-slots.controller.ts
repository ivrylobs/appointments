import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AvailabilitySlotsService } from './availability-slots.service';
import { CreateAvailabilitySlotDto } from './dto/create-availability-slot.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AvailabilitySlot } from './domain/availability-slot';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAvailabilitySlotsDto } from './dto/find-all-availability-slots.dto';

@ApiTags('Availabilityslots')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'appointments/availability-slots',
  version: '1',
})
export class AvailabilitySlotsController {
  constructor(
    private readonly availabilitySlotsService: AvailabilitySlotsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: AvailabilitySlot,
  })
  create(@Body() createAvailabilitySlotDto: CreateAvailabilitySlotDto) {
    return this.availabilitySlotsService.create(createAvailabilitySlotDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AvailabilitySlot),
  })
  async findAll(
    @Query() query: FindAllAvailabilitySlotsDto,
  ): Promise<InfinityPaginationResponseDto<AvailabilitySlot>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.availabilitySlotsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AvailabilitySlot,
  })
  findById(@Param('id') id: string) {
    return this.availabilitySlotsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AvailabilitySlot,
  })
  update(
    @Param('id') id: string,
    @Body() updateAvailabilitySlotDto: UpdateAvailabilitySlotDto,
  ) {
    return this.availabilitySlotsService.update(id, updateAvailabilitySlotDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.availabilitySlotsService.remove(id);
  }
}
