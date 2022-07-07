import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CafeService } from './cafe.service';
import { CreateCafeInput } from './dto/createCafe.input';
import { UpdateCafeInput } from './dto/updateCafe.input';

import { Cafe } from './entities/cafe.entity';

@Resolver()
export class CafeResolver {
    constructor(private readonly cafeService: CafeService) {}

    @Query(() => [Cafe])
    fetchCafes() {
        return this.cafeService.findAll();
    }

    @Query(() => Cafe)
    fetchCafe(
        @Args('name') name: string, //
    ) {
        return this.cafeService.findOne({ name });
    }

    @Mutation(() => Cafe)
    createCafe(
        @Args('createCafeInput') createCafeInput: CreateCafeInput, //
    ) {
        return this.cafeService.create({ createCafeInput });
    }

    @Mutation(() => Cafe)
    updateCafe(
        @Args('updateCafeInput') updateCafeInput: UpdateCafeInput, //
    ) {
        return this.cafeService.update({ updateCafeInput });
    }

    @Mutation(() => Boolean)
    deleteCafe(
        @Args('name') name: string, //
    ) {
        return this.cafeService.delete({ name });
    }
}
