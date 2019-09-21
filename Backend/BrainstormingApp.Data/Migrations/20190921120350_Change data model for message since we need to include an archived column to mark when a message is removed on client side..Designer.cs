﻿// <auto-generated />
using System;
using BrainstormingApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BrainstormingApp.Data.Migrations
{
    [DbContext(typeof(BrainstormingAppContext))]
    [Migration("20190921120350_Change data model for message since we need to include an archived column to mark when a message is removed on client side.")]
    partial class Changedatamodelformessagesinceweneedtoincludeanarchivedcolumntomarkwhenamessageisremovedonclientside
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BrainstormingApp.Domain.BrainstormingRoom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("BrainstormingApp.Domain.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BrainstormingRoomId");

                    b.Property<DateTime>("MessageArchived");

                    b.Property<DateTime>("MessageCreated")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("MessageText");

                    b.Property<string>("UserNick");

                    b.HasKey("Id");

                    b.HasIndex("BrainstormingRoomId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("BrainstormingApp.Domain.Message", b =>
                {
                    b.HasOne("BrainstormingApp.Domain.BrainstormingRoom")
                        .WithMany("Messages")
                        .HasForeignKey("BrainstormingRoomId");
                });
#pragma warning restore 612, 618
        }
    }
}
