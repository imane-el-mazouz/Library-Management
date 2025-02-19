package com.support_App.mapper;

import com.support_App.dto.BorrowingDTO;
import com.support_App.model.Borrowing;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class BorrowingMapper {

    // Convert Borrowing to BorrowingDTO
    public BorrowingDTO toDTO(Borrowing borrowing) {
        return new BorrowingDTO(
                borrowing.getId(),
                borrowing.getBook().getId(),
                borrowing.getUser().getId(),
                borrowing.getBorrowDate(),
                borrowing.getReturnDate()
        );
    }

    // Convert a list of Borrowing to a list of BorrowingDTO
    public List<BorrowingDTO> toDTOList(List<Borrowing> borrowings) {
        return borrowings.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


}
