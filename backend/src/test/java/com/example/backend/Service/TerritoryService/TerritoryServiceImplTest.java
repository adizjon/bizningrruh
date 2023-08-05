package com.example.backend.Service.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.TerritoryReq;
import com.example.backend.Repository.TerritoryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Streamable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.function.IntFunction;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

public class TerritoryServiceImplTest {

    @Mock
    private TerritoryRepo territoryRepo;

    @InjectMocks
    private TerritoryServiceImpl territoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddTerritory() {
        // Given
        TerritoryReq territoryReq = new TerritoryReq();
        territoryReq.setTitle("Territory1");
        territoryReq.setRegion("Region1");
        territoryReq.setLongitude(1.2345);
        territoryReq.setLatitude(5.6789);
        territoryReq.setActive(true);
        territoryReq.setCode("ABC123");

        Territory savedTerritory = new Territory(UUID.randomUUID(), "Territory1", "Region1", 1.2345, 5.6789, true, "ABC123");
        when(territoryRepo.save(any())).thenReturn(savedTerritory);

        // When
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) territoryService.addTerritory(territoryReq);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(savedTerritory, responseEntity.getBody());
    }

    @Test
    public void testDownloadTerritoryAsExcel() throws IOException {
        // Given
        int page = 1;
        int size = 10;
        boolean active = true;
        String search = "Territory";

        List<Territory> territoryList = new ArrayList<>();
        territoryList.add(new Territory(UUID.randomUUID(), "Territory1", "Region1", 1.2345, 5.6789, true, "ABC123"));
        Page<Territory> territoryPage = new MockPage<>(territoryList);

        when(territoryRepo.findAllByActiveAndTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(eq(active), anyString(), anyString(), any(Pageable.class)))
                .thenReturn(territoryPage);

        // When
        ResponseEntity<byte[]> responseEntity = territoryService.downloadTerritoryAsExcel(page, size, active, search);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", responseEntity.getHeaders().getContentType().toString());
        assertEquals("attachment; filename=territories.xlsx", responseEntity.getHeaders().getContentDisposition().toString());
        // Additional assertions can be made on the content of the excel file if required.
    }

    @Test
    public void testGetTerritories() {
        // Given
        int page = 1;
        int size = 10;
        boolean active = true;
        String search = "Territory";

        List<Territory> territoryList = new ArrayList<>();
        territoryList.add(new Territory(UUID.randomUUID(), "Territory1", "Region1", 1.2345, 5.6789, true, "ABC123"));
        Page<Territory> territoryPage = new MockPage<>(territoryList);

        when(territoryRepo.findAllByActiveAndTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(eq(active), anyString(), anyString(), any(Pageable.class)))
                .thenReturn(territoryPage);

        // When
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) territoryService.getTerritories(page, size, active, search);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(territoryPage, responseEntity.getBody());
    }

    @Test
    public void testEditTerritory() {
        // Given
        UUID territoryId = UUID.randomUUID();
        TerritoryReq territoryReq = new TerritoryReq();
        territoryReq.setTitle("Territory1");
        territoryReq.setRegion("Region1");
        territoryReq.setLongitude(1.2345);
        territoryReq.setLatitude(5.6789);
        territoryReq.setActive(true);
        territoryReq.setCode("ABC123");

        Territory existingTerritory = new Territory(territoryId, "Territory1", "Region1", 1.2345, 5.6789, true, "ABC123");
        when(territoryRepo.findById(eq(territoryId))).thenReturn(Optional.of(existingTerritory));

        when(territoryRepo.save(any())).thenReturn(existingTerritory);

        // When
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) territoryService.editTerritory(territoryId, territoryReq);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(existingTerritory, responseEntity.getBody());
    }
}

// Helper class for creating a MockPage
class MockPage<T> extends ArrayList<T> implements Page<T> {
    public MockPage(List<T> content) {
        super(content);
    }

    @Override
    public int getTotalPages() {
        return 1;
    }

    @Override
    public long getTotalElements() {
        return this.size();
    }

    @Override
    public <U> Page<U> map(Function<? super T, ? extends U> converter) {
        return null;
    }

    @Override
    public <R> Streamable<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper) {
        return Page.super.flatMap(mapper);
    }

    @Override
    public Streamable<T> filter(Predicate<? super T> predicate) {
        return Page.super.filter(predicate);
    }

    @Override
    public Streamable<T> and(Supplier<? extends Stream<? extends T>> stream) {
        return Page.super.and(stream);
    }

    @Override
    public Streamable<T> and(T... others) {
        return Page.super.and(others);
    }

    @Override
    public Streamable<T> and(Iterable<? extends T> iterable) {
        return Page.super.and(iterable);
    }

    @Override
    public Streamable<T> and(Streamable<? extends T> streamable) {
        return Page.super.and(streamable);
    }

    @Override
    public List<T> toList() {
        return Page.super.toList();
    }

    @Override
    public Set<T> toSet() {
        return Page.super.toSet();
    }

    @Override
    public Stream<T> get() {
        return Page.super.get();
    }

    @Override
    public Pageable nextOrLastPageable() {
        return Page.super.nextOrLastPageable();
    }

    @Override
    public Pageable previousOrFirstPageable() {
        return Page.super.previousOrFirstPageable();
    }

    @Override
    public int getNumber() {
        return 0;
    }

    @Override
    public int getSize() {
        return this.size();
    }

    @Override
    public int getNumberOfElements() {
        return this.size();
    }

    @Override
    public List<T> getContent() {
        return null;
    }

    @Override
    public boolean hasContent() {
        return false;
    }

    @Override
    public Sort getSort() {
        return null;
    }

    @Override
    public boolean hasPrevious() {
        return false;
    }

    @Override
    public Pageable getPageable() {
        return Page.super.getPageable();
    }

    @Override
    public boolean isFirst() {
        return true;
    }

    @Override
    public boolean hasNext() {
        return false;
    }

    @Override
    public boolean isLast() {
        return true;
    }

    @Override
    public Pageable nextPageable() {
        return null;
    }

    @Override
    public Pageable previousPageable() {
        return null;
    }

    @Override
    public Iterator<T> iterator() {
        return super.iterator();
    }

    @Override
    public <T1> T1[] toArray(IntFunction<T1[]> generator) {
        return super.toArray(generator);
    }

    @Override
    public Stream<T> stream() {
        return super.stream();
    }

    @Override
    public Stream<T> parallelStream() {
        return super.parallelStream();
    }
}
