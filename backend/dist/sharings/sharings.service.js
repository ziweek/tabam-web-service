"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../events/entity/event.entity");
const user_entity_1 = require("../users/entity/user.entity");
const typeorm_2 = require("typeorm");
const sharing_entity_1 = require("./entity/sharing.entity");
let SharingsService = class SharingsService {
    constructor(sharingsRepository, userRepository, eventRepository) {
        this.sharingsRepository = sharingsRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }
    async findSharingAll() {
        return this.sharingsRepository.find({ relations: ['author', 'car'] });
    }
    async findSharingOne(id) {
        return this.sharingsRepository.findOne({
            where: { id: id },
            relations: ['author', 'car'],
        });
    }
    async createSharing(sharing) {
        await sharing.passengers.push(sharing.author);
        await this.sharingsRepository.save(sharing);
    }
    async deleteSharing(sharing) {
        await this.sharingsRepository.delete(sharing);
    }
    async updateSharing(id, sharing) {
        this.sharingsRepository.update(id, {
            title: sharing.title,
            content: sharing.content,
            author: sharing.author,
            passengers: sharing.passengers,
        });
    }
    async addPassenger(id, addPassengerDto) {
        const targetSharing = await this.sharingsRepository.findOne({
            where: { id: id },
            relations: ['passengers'],
        });
        const targetUser = await this.userRepository.findOne({
            where: { id: addPassengerDto.passengerId },
        });
        targetSharing.passengers.push(targetUser);
        await this.sharingsRepository.save(targetSharing);
    }
    async addChatroom(id, addChatroomDto) {
        const targetSharing = await this.sharingsRepository.findOne({
            where: { id: id },
            relations: ['chatroom'],
        });
        const targetChatroom = await this.eventRepository.findOne({
            where: { room_id: addChatroomDto.room_id },
        });
        targetSharing.chatroom = targetChatroom;
        await this.sharingsRepository.save(targetSharing);
    }
};
SharingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sharing_entity_1.Sharing)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharingsService);
exports.SharingsService = SharingsService;
//# sourceMappingURL=sharings.service.js.map